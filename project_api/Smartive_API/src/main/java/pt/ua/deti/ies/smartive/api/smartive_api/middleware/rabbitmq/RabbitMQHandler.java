package pt.ua.deti.ies.smartive.api.smartive_api.middleware.rabbitmq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

@Component
@Getter
public class RabbitMQHandler {

    private final String address;
    private final int port;

    private Connection connection;
    private Channel channel;

    public RabbitMQHandler() {
        this.address = "localhost";
        this.port = 5672;
    }

    public void connect(String username, String password, String virtualHost) {

        ConnectionFactory factory = new ConnectionFactory();

        factory.setUsername(username);
        factory.setPassword(password);
        factory.setVirtualHost(virtualHost);
        factory.setHost(address);
        factory.setPort(port);

        try {
            this.connection = factory.newConnection();
            this.channel = connection.createChannel();
        } catch (IOException | TimeoutException e) {
            e.printStackTrace();
        }

    }

    public void setup(String exchangeName, String queueName) {

        try {
            this.channel.exchangeDeclare(exchangeName, "direct", true);
            this.channel.queueDeclare(queueName, true, false, false, null);
            this.channel.queueBind(queueName, exchangeName, queueName);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public void publish(String exchangeName, String queueName, String message) {

        try {
            channel.basicPublish(exchangeName, queueName, null, message.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public void disconnect() {

        try {
            channel.close();
            connection.close();
        } catch (IOException | TimeoutException e) {
            e.printStackTrace();
        }

    }

}
