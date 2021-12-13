package pt.ua.deti.ies.smartive.api.smartive_api.model.devices;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.tomcat.util.net.SendfileState;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.ua.deti.ies.smartive.api.smartive_api.redis.entities.RSensor;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "devices")
@Data
@ToString(callSuper = true)
public class Sensor extends Device {

    private SensorState state;

    public Sensor(ObjectId deviceId, String name, ObjectId roomId, DeviceCategory category, SensorState state) {
        super(deviceId, name, roomId, category);
        this.state = state;
    }

    public RSensor toRSensor() {
        return new RSensor(super.getDeviceId(), this.state);
    }

}
