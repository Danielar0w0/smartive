package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.SensorRepository;

import java.util.List;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;
    private final RoomService roomService;

    @Autowired
    public SensorService(SensorRepository sensorRepository, RoomService roomService) {
        this.sensorRepository = sensorRepository;
        this.roomService = roomService;
    }

    public void registerSensor(Sensor sensor) {

        sensor.setDeviceId(new ObjectId());

        if (sensor.getRoomId() != null) {

            if (roomService.exists(sensor.getRoomId())) {

                Room room = roomService.getRoom(sensor.getRoomId());
                room.getAbstractDevices().add(sensor);
                roomService.updateRoom(room);

            }

        }

        sensorRepository.save(sensor);

    }

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public boolean sensorExists(ObjectId objectId) {
        return sensorRepository.existsSensorByDeviceId(objectId);
    }

}
