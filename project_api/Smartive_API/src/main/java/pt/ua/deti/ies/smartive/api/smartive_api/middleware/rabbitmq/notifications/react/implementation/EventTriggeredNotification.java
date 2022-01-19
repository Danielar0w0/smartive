package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation;

import com.google.gson.JsonObject;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.RabbitMQHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.ReactNotificationType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events.SensorEvent;

public class EventTriggeredNotification extends ReactRabbitMQNotification {

    public EventTriggeredNotification(RabbitMQHandler rabbitMQHandler, Object... args) {
        super(rabbitMQHandler, args);
    }

    @Override
    public void sendNotification() {

        if (!getRabbitMQHandler().isConnected()) {
            getLogger().warn(String.format("Unable to send '%s' notification", getClass().getSimpleName()));
            return;
        }

        JsonObject messageObject = new JsonObject();
        messageObject.addProperty("notification", ReactNotificationType.EVENT_TRIGGERED.name());

        if (getArgs().length > 1) {

            SensorEvent sensorEvent = (SensorEvent) getArgs()[0];
            Sensor targetSensor = (Sensor) getArgs()[1];

            messageObject.addProperty("event", sensorEvent.getEvent().name());
            messageObject.addProperty("targetName", targetSensor.getName());
            messageObject.addProperty("targetId", targetSensor.getDeviceId().toString());

        }

        getRabbitMQHandler().publish(getQueue(), messageObject.toString());

    }

}
