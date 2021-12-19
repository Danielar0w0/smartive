package pt.ua.deti.ies.smartive.api.smartive_api.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.AbstractDevice;

import javax.persistence.Id;
import java.util.List;

@Document(collection = "rooms")
@Data
@AllArgsConstructor
public class Room {

    @Id
    @Field(value = "_id")
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId roomId;
    private String name;
    private List<String> users;
    private List<AbstractDevice> abstractDevices;
    private RoomStats stats;

    public boolean isValid() {
        return name != null;
    }

}
