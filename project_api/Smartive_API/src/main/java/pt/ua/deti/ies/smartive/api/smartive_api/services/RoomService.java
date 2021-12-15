package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidRoomException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.RoomRepository;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public void registerRoom(Room room) {
        if (!room.isValid())
            throw new InvalidRoomException("Invalid Room - invalid room.");
        roomRepository.save(room);
    }

}
