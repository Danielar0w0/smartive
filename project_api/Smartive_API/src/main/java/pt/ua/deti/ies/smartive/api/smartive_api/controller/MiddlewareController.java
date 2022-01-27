package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.auth.AuthHandler;
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
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.AvailableDevice;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;
import pt.ua.deti.ies.smartive.api.smartive_api.services.AvailableDeviceService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.RoomService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;
import pt.ua.deti.ies.smartive.api.smartive_api.utils.RequestType;

import java.util.List;


@RestController
@RequestMapping("/middleware")
public class MiddlewareController {

    private final SensorService sensorService;
    private final RoomService roomService;
    private final MiddlewareHandler middlewareHandler;
    private final MiddlewareInterceptor middlewareInterceptor;
    private final ReactNotificationFactory reactNotificationFactory;
    private final AuthHandler authHandler;
    private final AvailableDeviceService availableDeviceService;

    @Autowired
    public MiddlewareController(SensorService sensorService, RoomService roomService, MiddlewareHandler middlewareHandler, MiddlewareInterceptor middlewareInterceptor, ReactNotificationFactory reactNotificationFactory, AuthHandler authHandler, AvailableDeviceService availableDeviceService) {
        this.sensorService = sensorService;
        this.roomService = roomService;
        this.middlewareHandler = middlewareHandler;
        this.middlewareInterceptor = middlewareInterceptor;
        this.reactNotificationFactory = reactNotificationFactory;
        this.authHandler = authHandler;
        this.availableDeviceService = availableDeviceService;
    }

    @GetMapping("/devices/sensors")
    public List<Sensor> getAllRegisteredSensors() {
        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();
        return sensorService.getAllSensors();
    }

    @PutMapping("/devices/sensor")
    public MessageResponse updateState(@RequestBody Sensor sensor) {

        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

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

        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (sensorId == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (!sensorService.sensorExists(sensorId))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        Sensor sensor = sensorService.getSensorById(sensorId);
        return sensor.getState();

    }

    @GetMapping("/rooms/{roomId}/stats")
    public RoomStats getRoomStats(@PathVariable ObjectId roomId) {

        if (!roomService.exists(roomId))
            throw new InvalidRoomException("Unable to find a room with this Id.");
        return middlewareHandler.calculateRoomStats(roomId);

    }

    @PostMapping(value = "/devices/available")
    public MessageResponse getAllAvailableDevices(@RequestBody AvailableDevice availableDevice) {

        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (availableDeviceService.exists(availableDevice.getDeviceId()))
            availableDeviceService.delete(availableDevice.getDeviceId());

        availableDeviceService.save(availableDevice);
        return new MessageResponse("Successfully registered available device.");

    }

    @DeleteMapping(value = "/devices/available/{deviceId}")
    public MessageResponse removeAvailableDevice(@PathVariable ObjectId deviceId) {
        availableDeviceService.delete(deviceId);
        return new MessageResponse("Successfully removed available device.");
    }


}
