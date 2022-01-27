package pt.ua.deti.ies.smartive.api.smartive_api.model.history;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Date;

@Document(collection = "history")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class HistoryItem {

    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;

    private String username;
    private HistoryType type;
    private Date date;
    private String description;

}
