package pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorEventService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;

@Component
@Getter
public class MiddlewareActionDependencyInjector {

    private final SensorEventService sensorEventService;
    private final SensorService sensorService;

    @Autowired
    public MiddlewareActionDependencyInjector(SensorEventService sensorEventService, SensorService sensorService) {
        this.sensorEventService = sensorEventService;
        this.sensorService = sensorService;
    }

}
