package pt.ua.deti.ies.smartive.api.smartive_api.redis.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;

@Data
@AllArgsConstructor
public class RSensor {

    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId sensorId;
    private SensorState sensorState;

}
