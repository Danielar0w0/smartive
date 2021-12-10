package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.DeviceNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidDeviceException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Device;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.ISensorDAO;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.RSensor;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;

import java.util.Optional;

@RestController
@RequestMapping("/middleware")
public class MiddlewareController {

    private final SensorService sensorService;

    @Autowired
    private ISensorDAO sensorDAO;

    @Autowired
    public MiddlewareController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @PutMapping("/device/sensor")
    public MessageResponse updateState(@RequestBody Sensor sensor) {

        if (sensor.getDeviceId() == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (sensor.getState() == null)
            throw new InvalidDeviceException("Please provide a valid sensor state.");

        sensorService.updateSensorState(sensor);

        RSensor rSensor = new RSensor(sensor.getDeviceId(), sensor.getName(), sensor.getRoomId(), sensor.getCategory(), sensor.getState().getValue());

        sensorDAO.save(rSensor);


        return new MessageResponse("Successfully updated sensor state.");

    }

    @PostMapping(value = "/device/sensor")
    public Device postSensorData(@RequestBody Sensor sensor) {

        Optional<Sensor> foundDevice = sensorService.findByObjectId(sensor.getDeviceId().toString());
        if (foundDevice.isEmpty())
            throw new DeviceNotFoundException("Device not found");
        return foundDevice.get();

    }


}
