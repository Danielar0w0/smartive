package pt.ua.deti.ies.smartive.api.smartive_api.model.devices;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "devices")
@Data
@ToString(callSuper = true)
public class Device extends AbstractDevice {

    public Device(ObjectId deviceId, String name, ObjectId roomId, DeviceCategory category) {
        super(deviceId, name, roomId, category);
    }

}
