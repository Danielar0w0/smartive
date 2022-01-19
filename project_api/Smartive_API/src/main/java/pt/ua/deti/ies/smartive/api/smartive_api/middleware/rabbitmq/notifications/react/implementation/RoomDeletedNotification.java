package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.implementation;

import com.google.gson.JsonObject;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.RabbitMQHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react.ReactNotificationType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;

public class RoomDeletedNotification extends ReactRabbitMQNotification {

    public RoomDeletedNotification(RabbitMQHandler rabbitMQHandler, Object... args) {
        super(rabbitMQHandler, args);
    }

    @Override
    public void sendNotification() {

        if (!getRabbitMQHandler().isConnected()) {
            getLogger().warn(String.format("Unable to send '%s' notification", getClass().getSimpleName()));
            return;
        }

        JsonObject messageObject = new JsonObject();
        messageObject.addProperty("notification", ReactNotificationType.ROOM_DELETED.name());

        if (getArgs().length > 0)
            messageObject.addProperty("roomId", ((Room)getArgs()[0]).getRoomId().toString());

        getRabbitMQHandler().publish(getQueue(), messageObject.toString());

    }

}
