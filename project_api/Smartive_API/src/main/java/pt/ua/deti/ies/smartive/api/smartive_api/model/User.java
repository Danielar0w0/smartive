package pt.ua.deti.ies.smartive.api.smartive_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "users")
@Data
@AllArgsConstructor
public class User {

    private ObjectId userId;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
    
}
