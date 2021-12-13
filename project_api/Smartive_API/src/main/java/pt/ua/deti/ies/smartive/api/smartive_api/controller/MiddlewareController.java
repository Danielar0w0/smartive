package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.DeviceNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidDeviceException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.entities.NullRSensor;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.entities.RSensor;
import pt.ua.deti.ies.smartive.api.smartive_api.services.RSensorService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;


@RestController
@RequestMapping("/middleware")
public class MiddlewareController {

    private final SensorService sensorService;
    private final RSensorService rSensorService;

    @Autowired
    public MiddlewareController(SensorService sensorService, RSensorService rSensorService) {
        this.sensorService = sensorService;
        this.rSensorService = rSensorService;
    }

    @PutMapping("/device/sensor")
    public MessageResponse updateState(@RequestBody Sensor sensor) {

        if (sensor.getDeviceId() == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (sensor.getState() == null)
            throw new InvalidDeviceException("Please provide a valid sensor state.");

        if (!sensorService.sensorExists(sensor.getDeviceId()))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        rSensorService.save(sensor.toRSensor());

        return new MessageResponse("Successfully updated sensor state.");

    }

    @GetMapping("/device/sensor")
    public RSensor getSensorState(@RequestBody Sensor sensor) {

        if (sensor.getDeviceId() == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (!sensorService.sensorExists(sensor.getDeviceId()))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        RSensor redisSensor = rSensorService.load(sensor.getDeviceId());

        if (redisSensor instanceof NullRSensor)
            throw new DeviceNotFoundException("Unable to find the device.");
        return redisSensor;

    }


}
