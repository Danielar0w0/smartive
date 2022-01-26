package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.auth.AuthHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.*;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.MiddlewareHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.ReactNotificationFactory;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.ReactNotificationType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.model.RoomStats;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.AvailableDevice;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Device;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events.SensorEvent;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistoryItem;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistoryType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.users.User;
import pt.ua.deti.ies.smartive.api.smartive_api.model.users.UserStats;
import pt.ua.deti.ies.smartive.api.smartive_api.services.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UsersApiController {

    // Services
    private final UserService userService;
    private final RoomService roomService;
    private final HistoryService historyService;
    private final DeviceService deviceService;
    private final SensorService sensorService;
    private final SensorEventService sensorEventService;
    private final AvailableDeviceService availableDeviceService;

    // Auth
    private final AuthHandler authHandler;

    // Utils
    private final ReactNotificationFactory reactNotificationFactory;
    private final MiddlewareHandler middlewareHandler;

    @Autowired
    public UsersApiController(UserService userService, RoomService roomService, HistoryService historyService, DeviceService deviceService, SensorService sensorService, SensorEventService sensorEventService, AvailableDeviceService availableDeviceService, AuthHandler authHandler, ReactNotificationFactory reactNotificationFactory, MiddlewareHandler middlewareHandler) {
        this.userService = userService;
        this.roomService = roomService;
        this.historyService = historyService;
        this.deviceService = deviceService;
        this.sensorService = sensorService;
        this.sensorEventService = sensorEventService;
        this.availableDeviceService = availableDeviceService;
        this.authHandler = authHandler;
        this.reactNotificationFactory = reactNotificationFactory;
        this.middlewareHandler = middlewareHandler;
    }

    // --------------------------------------------------------------------------------------
    // History
    // --------------------------------------------------------------------------------------

    @GetMapping("/history")
    public List<HistoryItem> getAllHistory() {
        return historyService.getAllHistory().stream()
                .filter(historyItem -> historyItem.getUsername().equals(authHandler.getUserName()))
                .collect(Collectors.toList());
    }

    @GetMapping("/history/{historyType}")
    public List<HistoryItem> getAllHistory(@PathVariable HistoryType historyType) {
        return historyService.getAllHistory(historyType).stream()
                .filter(historyItem -> historyItem.getUsername().equals(authHandler.getUserName()))
                .collect(Collectors.toList());
    }

    // --------------------------------------------------------------------------------------
    // Users
    // --------------------------------------------------------------------------------------

    @GetMapping("/user/stats")
    public UserStats getUserStats() {

        int roomCount = (int) roomService.getAllRooms().stream()
                .filter(room -> room.getUsers().contains(authHandler.getUserName()))
                .count();

        AtomicInteger devicesCount = new AtomicInteger();

        roomService.getAllRooms().stream()
                .filter(room -> room.getUsers().contains(authHandler.getUserName()))
                .forEach(room -> devicesCount.addAndGet(room.getDevices().size()));

        return new UserStats(roomCount, devicesCount.get());

    }

    @GetMapping("/user")
    public User getCurrentUserDetails() {
        return userService.getByUsername(authHandler.getUserName());
    }

    // --------------------------------------------------------------------------------------
    // Rooms
    // --------------------------------------------------------------------------------------

    @GetMapping("/rooms")
    public List<Room> getAllRooms() {

        List<Room> allRooms = roomService.getAllRooms();

        return allRooms.stream()
                .filter(room -> room.getUsers().contains(authHandler.getUserName()))
                .collect(Collectors.toList());

    }

    @PostMapping("/rooms")
    public MessageResponse registerRoom(@RequestBody Room room) {

        if (!room.isValid())
            throw new InvalidRoomException("Invalid Room. Please provide all the mandatory fields.");

        if (roomService.exists(room.getName()))
            throw new InvalidRoomException("A room with that name already exists. Please use a different name.");

        if (room.getUsers() == null)
            room.setUsers(Collections.singletonList(authHandler.getUserName()));

        Room registeredRoom = roomService.registerRoom(room);
        reactNotificationFactory.generateNotification(ReactNotificationType.ROOM_ADDED, registeredRoom).sendNotification();

        HistoryItem historyItem = HistoryItem.builder()
                .id(null)
                .username(authHandler.getUserName())
                .type(HistoryType.ROOMS)
                .date(new Date())
                .description(String.format("Room %s was registered by %s.", room.getName(), authHandler.getUserName()))
                .build();

        historyService.saveHistory(historyItem);

        return new MessageResponse("The room was successfully registered.");

    }

    @DeleteMapping("/rooms/{roomId}")
    public MessageResponse deleteRoom(@PathVariable ObjectId roomId) {

        if (!roomService.exists(roomId))
            throw new InvalidRoomException(String.format("Unable to find a room with the id %s.", roomId.toString()));

        Room room = roomService.getRoom(roomId);

        if (!room.getUsers().contains(authHandler.getUserName()))
            throw new InvalidPermissionsException();

        for (Device currentDevice : room.getDevices()) {
            deviceService.deleteByDeviceId(currentDevice.getDeviceId());
            AvailableDevice newAvailableDevice = new AvailableDevice(currentDevice.getDeviceId(), "Device " + currentDevice.getDeviceId(), currentDevice.getCategory());
            availableDeviceService.save(newAvailableDevice);
        }

        roomService.deleteRoom(room);
        reactNotificationFactory.generateNotification(ReactNotificationType.ROOM_DELETED, room).sendNotification();

        HistoryItem historyItem = HistoryItem.builder()
                .id(null)
                .username(authHandler.getUserName())
                .type(HistoryType.ROOMS)
                .date(new Date())
                .description(String.format("Room %s was deleted by %s.", room.getName(), authHandler.getUserName()))
                .build();

        historyService.saveHistory(historyItem);

        return new MessageResponse("The room was successfully removed.");

    }

    @GetMapping("/rooms/{roomId}/stats")
    public RoomStats getRoomStats(@PathVariable ObjectId roomId) {

        if (!roomService.exists(roomId))
            throw new InvalidRoomException("Unable to find a room with this Id.");

        Room room = roomService.getRoom(roomId);

        if (room.getUsers().contains(authHandler.getUserName()))
            throw new InvalidPermissionsException();

        return middlewareHandler.calculateRoomStats(roomId);

    }

    // --------------------------------------------------------------------------------------
    // Devices
    // --------------------------------------------------------------------------------------

    @GetMapping(value = "/devices")
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices().stream()
                .filter(device -> device.getRoomId() != null)
                .filter(device -> {
                    Room deviceRoom = roomService.getRoom(device.getRoomId());
                    if (deviceRoom == null) return false;
                    return deviceRoom.getUsers().contains(authHandler.getUserName());
                })
                .collect(Collectors.toList());
    }

    @PostMapping("/devices/sensors/register")
    public MessageResponse registerSensor(@RequestBody Sensor sensor) {

        sensorService.registerSensor(sensor);
        reactNotificationFactory.generateNotification(ReactNotificationType.DEVICE_ADDED).sendNotification();

        HistoryItem historyItem = HistoryItem.builder()
                .id(null)
                .username(authHandler.getUserName())
                .type(HistoryType.DEVICES)
                .date(new Date())
                .description(String.format("Device %s was registered by %s.", sensor.getName(), authHandler.getUserName()))
                .build();

        historyService.saveHistory(historyItem);

        return new MessageResponse("The sensor was successfully registered.");

    }

    @GetMapping(value = "/devices/sensors")
    public List<Sensor> getAllRegisteredSensors() {

        return sensorService.getAllSensors().stream()
                .filter(sensor -> sensor.getRoomId() != null)
                .filter(sensor -> {
                    Room sensorRoom = roomService.getRoom(sensor.getRoomId());
                    if (sensorRoom == null) return false;
                    return sensorRoom.getUsers().contains(authHandler.getUserName());
                })
                .collect(Collectors.toList());

    }


    @GetMapping(value = "/devices/sensors/{roomId}")
    public List<Sensor> getRegisteredSensorsByRoom(@PathVariable ObjectId roomId) {

        if (roomId == null)
            throw new RoomNotFoundException("Unable to find the specified room.");

        Room room = roomService.getRoom(roomId);

        if (room == null || !room.getUsers().contains(authHandler.getUserName()))
            throw new InvalidPermissionsException();

        return sensorService.getAllSensors()
                .stream()
                .filter(sensor -> sensor.getRoomId() != null && sensor.getRoomId().equals(roomId))
                .collect(Collectors.toList());

    }

    @GetMapping("/devices/sensor/{sensorId}")
    public SensorState getSensorState(@PathVariable ObjectId sensorId) {

        if (!authHandler.getUserName().equals("admin"))
            throw new InvalidPermissionsException();

        if (sensorId == null)
            throw new InvalidDeviceException("Please provide a valid sensor id.");

        if (!sensorService.sensorExists(sensorId))
            throw new DeviceNotFoundException("Unable to find a device with that ID.");

        Sensor sensor = sensorService.getSensorById(sensorId);

        if (sensor.getRoomId() == null || !roomService.exists(sensor.getRoomId()))
            throw new InvalidRoomException(String.format("Unable to find a room with the id %s.", sensor.getRoomId()));

        Room room = roomService.getRoom(sensor.getRoomId());

        if (!room.getUsers().contains(authHandler.getUserName()))
            throw new InvalidPermissionsException();

        return sensor.getState();

    }

    // --------------------------------------------------------------------------------------
    // Devices Events
    // --------------------------------------------------------------------------------------

    @GetMapping("/devices/sensors/events")
    public List<SensorEvent> getSensorsEvents() {
        return sensorEventService.getAllEvents().stream()
                .filter(sensorEvent -> sensorService.getSensorById(sensorEvent.getSensorId()) != null)
                .filter(sensorEvent -> {
                    Sensor sensor = sensorService.getSensorById(sensorEvent.getSensorId());
                    if (sensor.getRoomId() == null) return false;
                    Room sensorRoom = roomService.getRoom(sensor.getRoomId());
                    return sensorRoom.getUsers().contains(authHandler.getUserName());
                })
                .collect(Collectors.toList());
    }

    @PostMapping("/devices/sensors/events")
    public SensorEvent addSensorEvent(@RequestBody SensorEvent event) {

        if (!sensorService.sensorExists(event.getSensorId()))
            throw new InvalidDeviceException(String.format("Unable to find a sensor with the id %s.", event.getSensorId()));

        Sensor sensor = sensorService.getSensorById(event.getSensorId());

        if (sensor.getRoomId() == null || !roomService.exists(sensor.getRoomId()))
            throw new InvalidRoomException(String.format("Unable to find a room with the id %s.", sensor.getRoomId()));

        Room room = roomService.getRoom(sensor.getRoomId());

        if (!room.getUsers().contains(authHandler.getUserName()))
            throw new InvalidPermissionsException();

        SensorEvent registeredEvent = sensorEventService.registerEvent(event);

        HistoryItem historyItem = HistoryItem.builder()
                .id(null)
                .username(authHandler.getUserName())
                .type(HistoryType.TRIGGERS)
                .date(new Date())
                .description(String.format("Trigger %s added for device %s by %s.", registeredEvent.getId().toString(), sensor.getName(), authHandler.getUserName()))
                .build();

        historyService.saveHistory(historyItem);

        return registeredEvent;

    }

    // --------------------------------------------------------------------------------------
    // Available Devices
    // --------------------------------------------------------------------------------------

    @DeleteMapping(value = "/devices/available/{deviceId}")
    public MessageResponse removeAvailableDevice(@PathVariable ObjectId deviceId) {
        availableDeviceService.delete(deviceId);
        return new MessageResponse("Successfully removed available device.");
    }

}
