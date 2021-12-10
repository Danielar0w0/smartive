package pt.ua.deti.ies.smartive.api.smartive_api.redis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;

@Configuration
public class RedisConfiguration {

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    public RedisTemplate<String, RSensor> sensorRedisTemplate() {
        RedisTemplate<String, RSensor> sensorRedisTemplate = new RedisTemplate<>();
        sensorRedisTemplate.setConnectionFactory(redisConnectionFactory());
        return sensorRedisTemplate;
    }

}
