package pt.ua.deti.ies.smartive.api.smartive_api.redis;

import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.exceptions.JedisException;

import java.time.Duration;
import java.util.function.Function;

@Getter
@Setter
@Component
public class RedisHandler {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private JedisPool jedisPool;

    private RedisHandler() { }

    public void createPool(String redisAddress) {

        final JedisPoolConfig poolConfig = configPool();

        try {
            if (jedisPool == null)
                jedisPool = new JedisPool(poolConfig, redisAddress);
        } catch (Exception e) {
            logger.warn("Unable to connect to Redis Server.");
        }

    }

    public void closePool() {
        jedisPool.close();
    }

    private JedisPoolConfig configPool() {

        final JedisPoolConfig poolConfig = new JedisPoolConfig();

        poolConfig.setMaxTotal(16);
        poolConfig.setMaxIdle(16);
        poolConfig.setMinIdle(0);

        poolConfig.setBlockWhenExhausted(true);

        poolConfig.setTestOnBorrow(true);
        poolConfig.setTestWhileIdle(true);

        poolConfig.setMinEvictableIdleTimeMillis(Duration.ofSeconds(60).toMillis());
        poolConfig.setTimeBetweenEvictionRunsMillis(Duration.ofSeconds(30).toMillis());
        poolConfig.setNumTestsPerEvictionRun(3);

        return poolConfig;

    }

    public Object execute(Function<Jedis, ?> function) {

        if (jedisPool == null) return null;

        try (Jedis jedisRes = jedisPool.getResource()) {
            return function.apply(jedisRes);
        } catch (JedisException jedisException) {
            logger.warn("Error getting redis pool resource.");
            jedisException.printStackTrace();
        }

        return null;

    }

}
