package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq;

import lombok.Getter;

@Getter
public abstract class ReactRabbitMQNotification extends RabbitMQNotification {

    private final String queue = "notifications_reactJS";

    public ReactRabbitMQNotification(RabbitMQHandler rabbitMQHandler) {
        super(rabbitMQHandler);
    }

}
