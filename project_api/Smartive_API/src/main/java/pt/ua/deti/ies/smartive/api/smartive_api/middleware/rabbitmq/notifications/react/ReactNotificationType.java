package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react;

import lombok.Getter;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation.RoomCreatedNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation.RoomDeletedNotification;

@Getter
public enum ReactNotificationType {

    ROOM_ADDED(RoomCreatedNotification.class),
    ROOM_DELETED(RoomDeletedNotification.class);

    private final Class<? extends ReactRabbitMQNotification> executorClass;

    ReactNotificationType(Class<? extends ReactRabbitMQNotification> executorClass) {
        this.executorClass = executorClass;
    }

}
