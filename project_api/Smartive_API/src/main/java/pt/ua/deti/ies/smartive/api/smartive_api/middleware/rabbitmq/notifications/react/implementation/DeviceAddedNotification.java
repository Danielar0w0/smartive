package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation;

import com.google.gson.JsonObject;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.RabbitMQHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.ReactNotificationType;

public class DeviceAddedNotification extends ReactRabbitMQNotification {

    public DeviceAddedNotification(RabbitMQHandler rabbitMQHandler, Object... args) {
        super(rabbitMQHandler, args);
    }

    @Override
    public void sendNotification() {

        if (!getRabbitMQHandler().isConnected()) {
            getLogger().warn(String.format("Unable to send '%s' notification", getClass().getSimpleName()));
            return;
        }

        JsonObject messageObject = new JsonObject();
        messageObject.addProperty("notification", ReactNotificationType.DEVICE_ADDED.name());

        getRabbitMQHandler().publish(getQueue(), messageObject.toString());

    }

}
