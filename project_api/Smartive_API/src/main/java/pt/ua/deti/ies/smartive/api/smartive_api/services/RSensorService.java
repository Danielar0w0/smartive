package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.RedisHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.entities.RSensor;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.clients.jedis.Response;

import java.util.function.Function;

@Service
public class RSensorService {

    private final RedisHandler redisHandler;

    @Autowired
    public RSensorService(RedisHandler redisHandler) {
        this.redisHandler = redisHandler;
    }

    public void save(RSensor rSensor) {

        Function<Jedis, ?> function = (jedisRes) -> {

            String redisKey = "smartive:sensor:" + rSensor.getSensorId().toString();

            Pipeline pipeline = jedisRes.pipelined();

            pipeline.hset(redisKey, "Value", String.valueOf(rSensor.getSensorState().getValue()));
            pipeline.hset(redisKey, "Unit", rSensor.getSensorState().getUnit());

            pipeline.sync();
            jedisRes.resetState();

            return null;

        };

        redisHandler.execute(function);

    }

    public RSensor load(ObjectId sensorId) {

        Function<Jedis, ?> function = (jedisRes) -> {

            String redisKey = "smartive:sensor:" + sensorId.toString();

            Pipeline pipeline = jedisRes.pipelined();

            Response<String> sensorValue = pipeline.hget(redisKey, "Value");
            Response<String> sensorUnit = pipeline.hget(redisKey, "Unit");

            pipeline.sync();
            jedisRes.resetState();

            return new RSensor(sensorId, new SensorState(Double.parseDouble(sensorValue.get()), sensorUnit.get()));

        };

        return (RSensor) redisHandler.execute(function);

    }


}
