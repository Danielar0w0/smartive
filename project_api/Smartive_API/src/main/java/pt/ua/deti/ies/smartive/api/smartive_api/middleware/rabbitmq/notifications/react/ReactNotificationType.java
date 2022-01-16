package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react;

import lombok.Getter;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation.*;

@Getter
public enum ReactNotificationType {

    ROOM_ADDED(RoomCreatedNotification.class),
    ROOM_DELETED(RoomDeletedNotification.class),
    ROOM_STATS_CHANGED(RoomStatsChangedNotification.class),
    DEVICE_ADDED(DeviceAddedNotification.class),
    DEVICE_REMOVED(DeviceRemovedNotification.class),
    DEVICE_STATS_CHANGED(DeviceStatsChangedNotification.class);

    private final Class<? extends ReactRabbitMQNotification> executorClass;

    ReactNotificationType(Class<? extends ReactRabbitMQNotification> executorClass) {
        this.executorClass = executorClass;
    }

}
