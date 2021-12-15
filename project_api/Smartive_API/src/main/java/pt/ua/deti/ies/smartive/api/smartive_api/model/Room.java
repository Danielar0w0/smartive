package pt.ua.deti.ies.smartive.api.smartive_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.List;

@Document(collection = "rooms")
@Data
@AllArgsConstructor
public class Room {

    @Id
    private ObjectId roomId;
    private String name;
    private List<String> users;

    public boolean isValid() {
        return name != null;
    }

}
