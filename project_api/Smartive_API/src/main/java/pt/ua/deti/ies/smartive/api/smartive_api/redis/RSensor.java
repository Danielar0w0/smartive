package pt.ua.deti.ies.smartive.api.smartive_api.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.DeviceCategory;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RSensor implements Serializable {

    private ObjectId deviceId;
    private String name;
    private ObjectId roomId;
    private DeviceCategory category;
    private double value;

}
