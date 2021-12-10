package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidUserException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.RoomNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.UserAlreadyExistsException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.model.User;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.services.RoomService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.UserService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PublicAPIController {

    private final SensorService sensorService;
    private final UserService userService;
    private final RoomService roomService;

    @Autowired
    public PublicAPIController(SensorService sensorService, UserService userService, RoomService roomService) {
        this.sensorService = sensorService;
        this.userService = userService;
        this.roomService = roomService;
    }

    @PostMapping("/user/register")
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

    @PostMapping("/room/register")
    public MessageResponse registerRoom(@RequestBody Room room) {

        if (!room.isValid())
            throw new InvalidUserException("Invalid Room. Please provide all the mandatory fields.");

        if (room.getUsers() == null)
            room.setUsers(Collections.emptyList());

        roomService.registerRoom(room);
        return new MessageResponse("The room was successfully registered.");

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
