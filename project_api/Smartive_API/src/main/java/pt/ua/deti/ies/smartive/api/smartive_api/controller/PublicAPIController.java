package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidRoomException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidUserException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.RoomNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.UserAlreadyExistsException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.model.User;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.AvailableDevice;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Device;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.services.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PublicAPIController {

    private final SensorService sensorService;
    private final UserService userService;
    private final RoomService roomService;
    private final DeviceService deviceService;
    private final AvailableDeviceService availableDeviceService;

    @Autowired
    public PublicAPIController(SensorService sensorService, UserService userService, RoomService roomService, DeviceService deviceService, AvailableDeviceService availableDeviceService) {
        this.sensorService = sensorService;
        this.userService = userService;
        this.roomService = roomService;
        this.deviceService = deviceService;
        this.availableDeviceService = availableDeviceService;
    }

    @PostMapping("/users/register")
    public MessageResponse registerUser(@RequestBody User user) {

        if (!user.isValid())
            throw new InvalidUserException("Invalid user. Please provide all the mandatory fields.");

        try {
            userService.registerUser(user);
        } catch (DuplicateKeyException keyException) {
            throw new UserAlreadyExistsException(String.format("A user with the email %s is already registered.", user.getEmail()));
        }

        return new MessageResponse("The user was successfully registered.");

    }

    @PostMapping("/rooms/register")
    public MessageResponse registerRoom(@RequestBody Room room) {

        if (!room.isValid())
            throw new InvalidRoomException("Invalid Room. Please provide all the mandatory fields.");

        if (roomService.exists(room.getName()))
            throw new InvalidRoomException("A room with that name already exists. Please use a different name.");

        if (room.getUsers() == null)
            room.setUsers(Collections.emptyList());

        roomService.registerRoom(room);
        return new MessageResponse("The room was successfully registered.");

    }

    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PostMapping("/devices/sensors/register")
    public MessageResponse registerSensor(@RequestBody Sensor sensor) {
        sensorService.registerSensor(sensor);
        return new MessageResponse("The sensor was successfully registered.");
    }

    @GetMapping(value = "/devices/sensors")
    public List<Sensor> getAllRegisteredSensors() {
        return sensorService.getAllSensors();
    }

    @GetMapping(value = "/devices")
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping(value = "/devices/available")
    public List<AvailableDevice> getAllAvailableDevices() {
        return availableDeviceService.getAllAvailableDevices();
    }

    @PostMapping(value = "/devices/available")
    public MessageResponse getAllAvailableDevices(@RequestBody AvailableDevice availableDevice) {
        availableDeviceService.save(availableDevice);
        return new MessageResponse("Successfully registered available device.");
    }

    @DeleteMapping(value = "/devices/available/{deviceId}")
    public MessageResponse removeAvailableDevice(@PathVariable ObjectId deviceId) {
        availableDeviceService.delete(deviceId);
        return new MessageResponse("Successfully removed available device.");
    }

    @GetMapping(value = "/devices/sensors_by_room")
    public List<Sensor> getRegisteredSensorsByRoom(@RequestBody Room room) {

        if (room.getRoomId() == null)
            throw new RoomNotFoundException("Unable to find the specified room.");

        return getAllRegisteredSensors()
                .stream()
                .filter(sensor -> sensor.getRoomId().equals(room.getRoomId()))
                .collect(Collectors.toList());

    }

}
