package pt.ua.deti.ies.smartive.api.smartive_api.model.history;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "history")
@Data
@ToString(callSuper = true)
public class HistorySensorItem extends HistoryItem {

    private ObjectId sensorId;
    private Double value;
    private Double powerConsumption;

    public HistorySensorItem(ObjectId id, String username, HistoryType type, Date date, String description, ObjectId sensorId, Double value, Double powerConsumption) {
        super(id, username, type, date, description);
        this.sensorId = sensorId;
        this.value = value;
        this.powerConsumption = powerConsumption;
    }

}
