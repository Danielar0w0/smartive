package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidRoomException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.RoomRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room registerRoom(Room room) {

        if (!room.isValid())
            throw new InvalidRoomException("Invalid Room - invalid room.");

        if (room.getDevices() == null) room.setDevices(new ArrayList<>());
        if (room.getUsers() == null) room.setUsers(new ArrayList<>());

        roomRepository.save(room);

        return roomRepository.findByRoomId(room.getRoomId());

    }

    public Room getRoom(ObjectId roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public boolean exists(ObjectId roomId) {
        return roomRepository.existsByRoomId(roomId);
    }

    public boolean exists(String roomName) {
        return roomRepository.existsByName(roomName);
    }

    public void saveRoom(Room room) {
        roomRepository.save(room);
    }

    public void deleteRoom(Room room) {
        roomRepository.deleteByRoomId(room.getRoomId());
    }

    public void updateRoom(Room room) {
        roomRepository.deleteByRoomId(room.getRoomId());
        roomRepository.save(room);
    }

}
