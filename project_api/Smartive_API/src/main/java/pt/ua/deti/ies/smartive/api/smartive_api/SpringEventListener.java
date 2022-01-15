package pt.ua.deti.ies.smartive.api.smartive_api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.RabbitMQHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.RedisHandler;

import javax.annotation.PreDestroy;

@Component
public class SpringEventListener {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private final RedisHandler redisHandler;
    private final RabbitMQHandler rabbitMQHandler;

    @Value("${spring.redis.host}")
    private String redisAddress;

    @Value("${spring.redis.port}")
    private int redisPort;

    @Value("${spring.rabbitmq.username}")
    private String rabbitMQUser;

    @Value("${spring.rabbitmq.password}")
    private String rabbitMQPassword;

    @Autowired
    public SpringEventListener(RedisHandler redisHandler, RabbitMQHandler rabbitMQHandler) {
        this.redisHandler = redisHandler;
        this.rabbitMQHandler = rabbitMQHandler;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runAfterStartup() {

        redisHandler.createPool(redisAddress, redisPort);
        logger.info("Successfully created Redis pool!");

        rabbitMQHandler.connect(rabbitMQUser, rabbitMQPassword, "/");
        rabbitMQHandler.setup("notifiers_reactJS");
        logger.info("Successfully connected to RabbitMQ!");

    }

    @PreDestroy
    public void runOnShutdown() {

        redisHandler.closePool();
        logger.info("Successfully closed Redis pool!");

        rabbitMQHandler.disconnect();
        logger.info("Successfully disconnected from RabbitMQ!");

    }

}
