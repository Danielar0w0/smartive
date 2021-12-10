package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.RoomNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PublicAPIController {

    private final SensorService sensorService;

    @Autowired
    public PublicAPIController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @PostMapping("/device/sensor/register")
    public MessageResponse registerDevice(@RequestBody Sensor sensor) {
        sensorService.registerSensor(sensor);
        return new MessageResponse("The sensor was successfully registered.");
    }

    @GetMapping(value = "/device/sensors")
    public List<Sensor> getAllRegisteredSensors() {
        return sensorService.getAllSensors();
    }

    @GetMapping(value = "/device/sensors_by_room")
    public List<Sensor> getRegisteredSensorsByRoom(@RequestBody Room room) {

        if (room.getRoomId() == null)
            throw new RoomNotFoundException("Unable to find the specified room.");

        return getAllRegisteredSensors()
                .stream()
                .filter(sensor -> sensor.getRoomId().equals(room.getRoomId()))
                .collect(Collectors.toList());

    }

}
