package pt.ua.deti.ies.smartive.api.smartive_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "users")
@Data
@AllArgsConstructor
public class User {

    @Id
    private ObjectId userId;
    private String username;
    private String name;
    private String email;
    
}
