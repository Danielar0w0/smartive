package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Getter
public abstract class RabbitMQNotification {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final RabbitMQHandler rabbitMQHandler;

    public RabbitMQNotification(RabbitMQHandler rabbitMQHandler) {
        this.rabbitMQHandler = rabbitMQHandler;
    }

    public abstract void sendNotification();

}
