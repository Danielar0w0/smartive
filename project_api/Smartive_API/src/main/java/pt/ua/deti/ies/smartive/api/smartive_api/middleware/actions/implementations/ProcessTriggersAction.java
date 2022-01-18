package pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions.implementations;

import pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions.MiddlewareAction;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions.MiddlewareActionDependencyInjector;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events.ActionType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events.SensorEvent;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events.Trigger;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorEventService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;

public class ProcessTriggersAction extends MiddlewareAction {

    public ProcessTriggersAction(MiddlewareActionDependencyInjector middlewareActionDependencyInjector, Object[] args) {
        super(middlewareActionDependencyInjector, args);
    }

    @Override
    public boolean process() {

        if (getArgs().length <= 0) return false;

        Sensor sensor = (Sensor) getArgs()[0];
        SensorEventService sensorEventService = getMiddlewareActionDependencyInjector().getSensorEventService();
        SensorService sensorService = getMiddlewareActionDependencyInjector().getSensorService();

        for (SensorEvent sensorEvent : sensorEventService.getAllEvents()) {

            if (sensorEvent.getSensorId().equals(sensor.getDeviceId())) {

                Trigger trigger = sensorEvent.getTrigger();
                Sensor targetSensor = sensorService.getSensorById(sensorEvent.getTargetId());

                switch (trigger.getType()) {

                    case ON_VALUE_EQUALS:

                        if ((double) sensor.getState().getValue() == trigger.getValue())
                            handleEvent(sensorEvent, targetSensor);
                        break;

                    case ON_VALUE_BIGGER_THAN:

                        if (sensor.getState().getValue() > trigger.getValue())
                            handleEvent(sensorEvent, targetSensor);
                        break;

                    case ON_VALUE_LESS_THAN:

                        if (sensor.getState().getValue() < trigger.getValue())
                            handleEvent(sensorEvent, targetSensor);
                        break;

                    case ON_VALUE_SIMILIAR_TO:

                        if (Math.abs(sensor.getState().getValue() - trigger.getValue()) <= 1)
                            handleEvent(sensorEvent, targetSensor);
                        break;

                    default:
                        break;
                }

            }

        }

        return true;

    }

    private void handleEvent(SensorEvent sensorEvent, Sensor targetSensor) {

        if (sensorEvent.getEvent() == ActionType.TURN_OFF) {
            targetSensor.getState().setStatus(false);
        } else if (sensorEvent.getEvent() == ActionType.TURN_ON) {
            targetSensor.getState().setStatus(true);
        } else {
            // TODO: Complete this.
        }

        getMiddlewareActionDependencyInjector().getSensorService().update(targetSensor);

    }

}
