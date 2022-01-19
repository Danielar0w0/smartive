package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Getter
public abstract class RabbitMQNotification {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final RabbitMQHandler rabbitMQHandler;
    private final Object[] args;

    public RabbitMQNotification(RabbitMQHandler rabbitMQHandler, Object... args) {
        this.rabbitMQHandler = rabbitMQHandler;
        this.args = args;
    }

    public abstract void sendNotification();

}
