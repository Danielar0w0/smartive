package pt.ua.deti.ies.smartive.api.smartive_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SmartiveApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartiveApiApplication.class, args);
    }

}
