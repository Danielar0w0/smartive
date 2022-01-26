package pt.ua.deti.ies.smartive.api.smartive_api.model.history;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Date;

@Document(collection = "history")
@Data
@AllArgsConstructor
@Builder
public class HistoryItem {

    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private final ObjectId id;

    private final String username;
    private final HistoryType type;
    private final Date date;
    private final String description;

}
