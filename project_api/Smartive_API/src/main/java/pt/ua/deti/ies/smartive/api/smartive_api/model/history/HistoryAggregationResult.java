package pt.ua.deti.ies.smartive.api.smartive_api.model.history;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
public class HistoryAggregationResult {

    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId sensorId;

    private double combinedPowerConsumption;
    private double averageValue;

}
