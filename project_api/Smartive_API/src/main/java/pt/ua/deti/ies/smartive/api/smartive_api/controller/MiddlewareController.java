package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.DeviceNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidDeviceException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidRoomException;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.MiddlewareHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.RoomStats;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.entities.NullRSensor;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.entities.RSensor;
import pt.ua.deti.ies.smartive.api.smartive_api.services.RSensorService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.RoomService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;


@RestController
@RequestMapping("/middleware")
public class MiddlewareController {

    private final SensorService sensorService;
    private final RoomService roomService;
    private final MiddlewareHandler middlewareHandler;

    @Autowired
    public MiddlewareController(SensorService sensorService, RoomService roomService, MiddlewareHandler middlewareHandler) {
        this.sensorService = sensorService;
        this.roomService = roomService;
        this.middlewareHandler = middlewareHandler;
    }

    @PutMapping("/device/sensor")
    public MessageResponse updateState(@RequestBody Sensor sensor) {

        if (sensor.getDeviceId() == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (sensor.getState() == null)
            throw new InvalidDeviceException("Please provide a valid sensor state.");

        if (!sensorService.sensorExists(sensor.getDeviceId()))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        middlewareHandler.updateSensorState(sensor.getDeviceId(), sensor.getState());

        return new MessageResponse("Successfully updated sensor state.");

    }

    @GetMapping("/device/sensor")
    public RSensor getSensorState(@RequestBody ObjectId id) {

        if (id == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (!sensorService.sensorExists(id))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        SensorState sensorState = middlewareHandler.getSensorState(id);

        if (sensorState == null)
            throw new DeviceNotFoundException("Unable to load the device from Redis cache.");

        return new RSensor(id, sensorState);

    }

    @GetMapping("/rooms/{roomId}/stats")
    public RoomStats getRoomStats(@PathVariable ObjectId roomId) {

        if (!roomService.exists(roomId))
            throw new InvalidRoomException("Unable to find a room with this Id.");
        return middlewareHandler.calculateRoomStats(roomId);

    }

}
