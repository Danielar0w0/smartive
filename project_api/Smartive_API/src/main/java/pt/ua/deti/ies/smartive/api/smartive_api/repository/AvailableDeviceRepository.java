package pt.ua.deti.ies.smartive.api.smartive_api.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.AvailableDevice;

public interface AvailableDeviceRepository extends MongoRepository<AvailableDevice, Long> {

    boolean existsByDeviceId(ObjectId objectId);
    void deleteByDeviceId(ObjectId objectId);

}
