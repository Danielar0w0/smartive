package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.notifications.react;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.RabbitMQHandler;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq.ReactRabbitMQNotification;

import java.lang.reflect.Constructor;

@Component
public class ReactNotificationFactory {

    private final RabbitMQHandler rabbitMQHandler;

    @Autowired
    public ReactNotificationFactory(RabbitMQHandler rabbitMQHandler) {
        this.rabbitMQHandler = rabbitMQHandler;
    }

    public ReactRabbitMQNotification generateNotification(ReactNotificationType reactNotificationType, Object... args) {

        Class<? extends ReactRabbitMQNotification> executorClass = reactNotificationType.getExecutorClass();

        try {
            Constructor<? extends ReactRabbitMQNotification> executorClassConstructor = executorClass.getConstructor(RabbitMQHandler.class, Object[].class);
            return executorClassConstructor.newInstance(rabbitMQHandler, args);
        } catch (ReflectiveOperationException e) {
            e.printStackTrace();
        }

        return null;

    }

}
