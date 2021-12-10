package pt.ua.deti.ies.smartive.api.smartive_api.redis;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

@Repository
public class SensorDAOImpl implements ISensorDAO {

    private final String hashReference= "Sensor";

    @Resource(name="sensorRedisTemplate")
    private HashOperations<String, String, RSensor> hashOperations;

    @Override
    public void save(RSensor sensor) {
        hashOperations.putIfAbsent(hashReference, sensor.getDeviceId().toString(), sensor);
    }

}
