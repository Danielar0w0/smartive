package pt.ua.deti.ies.smartive.api.smartive_api.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;

public interface RoomRepository extends MongoRepository<Room, Long> {

    boolean existsByRoomId(ObjectId roomId);
    boolean existsByName(String roomName);
    Room findByRoomId(ObjectId roomId);
    void deleteByRoomId(ObjectId roomId);

}
