package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react;

import lombok.Getter;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation.RoomCreatedNotification;

@Getter
public enum ReactNotificationType {

    ROOM_ADDED(RoomCreatedNotification.class);

    private final Class<? extends ReactRabbitMQNotification> executorClass;

    ReactNotificationType(Class<? extends ReactRabbitMQNotification> executorClass) {
        this.executorClass = executorClass;
    }

}
