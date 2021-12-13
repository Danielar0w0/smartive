package pt.ua.deti.ies.smartive.api.smartive_api.redis.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;

@Data
@AllArgsConstructor
public class RSensor {

    private ObjectId sensorId;
    private SensorState sensorState;

}
