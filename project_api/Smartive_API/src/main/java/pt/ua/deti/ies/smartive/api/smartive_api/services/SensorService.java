package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.SensorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;

    @Autowired
    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public void registerSensor(Sensor sensor) {
        sensorRepository.save(sensor);
    }

    public Optional<Sensor> findByObjectId(String id) {
        return sensorRepository.findByDeviceId(new ObjectId(id)).stream().findFirst();
    }

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public boolean sensorExists(ObjectId objectId) {
        return sensorRepository.existsSensorByDeviceId(objectId);
    }

}
