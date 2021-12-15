package pt.ua.deti.ies.smartive.api.smartive_api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.RedisHandler;

import javax.annotation.PreDestroy;

@Component
public class SpringEventListener {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private final RedisHandler redisHandler;

    @Autowired
    public SpringEventListener(RedisHandler redisHandler) {
        this.redisHandler = redisHandler;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runAfterStartup() {

        redisHandler.createPool("localhost");
        logger.info("Successfully created Redis pool!");

    }

    @PreDestroy
    public void runOnShutdown() {

        redisHandler.closePool();
        logger.info("Successfully closed Redis pool!");

    }

}
