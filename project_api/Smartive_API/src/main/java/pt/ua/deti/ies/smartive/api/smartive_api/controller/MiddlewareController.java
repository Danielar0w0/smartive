package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.auth.AuthManager;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.DeviceNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidDeviceException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidPermissionsException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidRoomException;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.MiddlewareHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.MiddlewareInterceptor;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.ReactNotificationFactory;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.ReactNotificationType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.model.RoomStats;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;
import pt.ua.deti.ies.smartive.api.smartive_api.services.RoomService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;
import pt.ua.deti.ies.smartive.api.smartive_api.utils.RequestType;


@RestController
@RequestMapping("/middleware")
public class MiddlewareController {

    private final SensorService sensorService;
    private final RoomService roomService;
    private final MiddlewareHandler middlewareHandler;
    private final MiddlewareInterceptor middlewareInterceptor;
    private final ReactNotificationFactory reactNotificationFactory;
    private final AuthManager authManager;

    @Autowired
    public MiddlewareController(SensorService sensorService, RoomService roomService, MiddlewareHandler middlewareHandler, MiddlewareInterceptor middlewareInterceptor, ReactNotificationFactory reactNotificationFactory, AuthManager authManager) {
        this.sensorService = sensorService;
        this.roomService = roomService;
        this.middlewareHandler = middlewareHandler;
        this.middlewareInterceptor = middlewareInterceptor;
        this.reactNotificationFactory = reactNotificationFactory;
        this.authManager = authManager;
    }

    @PutMapping("/devices/sensor")
    public MessageResponse updateState(@RequestBody Sensor sensor) {

        if (sensor.getDeviceId() == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (sensor.getState() == null)
            throw new InvalidDeviceException("Please provide a valid sensor state.");

        if (!sensorService.sensorExists(sensor.getDeviceId()))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        SensorState newSensorState = sensor.getState();
        Sensor registeredSensor = sensorService.getSensorById(sensor.getDeviceId());

        registeredSensor.setState(newSensorState);
        sensorService.update(registeredSensor);

        if (registeredSensor.getRoomId() != null)
            reactNotificationFactory.generateNotification(ReactNotificationType.ROOM_STATS_CHANGED, registeredSensor.getRoomId().toString()).sendNotification();

        middlewareInterceptor.interceptRequest("/middleware/devices/sensor", RequestType.PUT, sensor);
        reactNotificationFactory.generateNotification(ReactNotificationType.DEVICE_STATS_CHANGED, registeredSensor.getDeviceId().toString()).sendNotification();

        return new MessageResponse("Successfully updated sensor state.");

    }

    @GetMapping("/devices/sensor/{sensorId}")
    public SensorState getSensorState(@PathVariable ObjectId sensorId) {

        if (sensorId == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (!sensorService.sensorExists(sensorId))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        Sensor sensor = sensorService.getSensorById(sensorId);

        if (sensor.getRoomId() == null || !roomService.exists(sensor.getRoomId()))
            throw new InvalidRoomException(String.format("Unable to find a room with the id %s.", sensor.getRoomId()));

        Room room = roomService.getRoom(sensor.getRoomId());

        if (!room.getUsers().contains(authManager.getUserName()))
            throw new InvalidPermissionsException();

        return sensor.getState();

    }

    @GetMapping("/rooms/{roomId}/stats")
    public RoomStats getRoomStats(@PathVariable ObjectId roomId) {

        if (!roomService.exists(roomId))
            throw new InvalidRoomException("Unable to find a room with this Id.");

        Room room = roomService.getRoom(roomId);

        if (room.getUsers().contains(authManager.getUserName()))
            throw new InvalidPermissionsException();

        return middlewareHandler.calculateRoomStats(roomId);

    }

}
