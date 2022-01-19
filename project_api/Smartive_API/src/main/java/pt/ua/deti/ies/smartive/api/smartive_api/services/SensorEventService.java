package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events.SensorEvent;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.SensorEventRepository;

import java.util.List;

@Service
public class SensorEventService {

    private final SensorEventRepository sensorEventRepository;

    @Autowired
    public SensorEventService(SensorEventRepository sensorEventRepository) {
        this.sensorEventRepository = sensorEventRepository;
    }

    public SensorEvent registerEvent(SensorEvent sensorEvent) {
        return sensorEventRepository.save(sensorEvent);
    }

    public List<SensorEvent> getAllEvents() {
        return sensorEventRepository.findAll();
    }

}
