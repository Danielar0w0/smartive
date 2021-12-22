package pt.ua.deti.ies.smartive.api.smartive_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;

@Document(collection = "users")
@Data
@AllArgsConstructor
public class User {

    @Id
    @Field(value = "_id")
    private ObjectId userId;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;

    public boolean isValid() {
        return name != null && email != null && password != null;
    }

}
