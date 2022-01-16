package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react;

import lombok.Getter;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation.RoomCreatedNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation.RoomDeletedNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation.RoomStatsChangedNotification;

@Getter
public enum ReactNotificationType {

    ROOM_ADDED(RoomCreatedNotification.class),
    ROOM_DELETED(RoomDeletedNotification.class),
    ROOM_STATS_CHANGED(RoomStatsChangedNotification.class);

    private final Class<? extends ReactRabbitMQNotification> executorClass;

    ReactNotificationType(Class<? extends ReactRabbitMQNotification> executorClass) {
        this.executorClass = executorClass;
    }

}
