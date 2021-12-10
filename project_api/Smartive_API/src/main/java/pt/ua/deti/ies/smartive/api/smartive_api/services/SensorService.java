package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.DeviceNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidDeviceException;
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

    public void updateSensorState(Sensor sensor) {

        if (sensor.getDeviceId() == null || sensor.getState() == null)
            throw new InvalidDeviceException("Please provide a valid sensor entity.");

        Optional<Sensor> registeredSensorOptional = findByObjectId(sensor.getDeviceId().toString());

        if (registeredSensorOptional.isEmpty())
            throw new DeviceNotFoundException(String.format("Unable to found a sensor with id %s.", sensor.getDeviceId().toString()));

        Sensor registeredSensor = registeredSensorOptional.get();
        registeredSensor.setState(sensor.getState());

        sensorRepository.deleteByDeviceId(registeredSensor.getDeviceId());
        sensorRepository.save(registeredSensor);

    }

}
