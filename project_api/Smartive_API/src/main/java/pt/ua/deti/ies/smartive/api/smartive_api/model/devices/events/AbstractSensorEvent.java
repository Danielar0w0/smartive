package pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class AbstractSensorEvent {

    @Id
    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId id;

    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId sensorId;

    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId targetId;

    private ActionType event;
    private Trigger trigger;

}
