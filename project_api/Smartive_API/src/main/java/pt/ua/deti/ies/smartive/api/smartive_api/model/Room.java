package pt.ua.deti.ies.smartive.api.smartive_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Device;

import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Document(collection = "rooms")
@Data
@AllArgsConstructor
public class Room {

    @Id
    private ObjectId roomId;
    private String name;
    private List<User> users;
    @ManyToMany
    private List<Device> devices;

}
