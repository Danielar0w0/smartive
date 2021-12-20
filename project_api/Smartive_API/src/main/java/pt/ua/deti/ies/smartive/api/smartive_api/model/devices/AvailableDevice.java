package pt.ua.deti.ies.smartive.api.smartive_api.model.devices;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "availableDevices")
@Data
@ToString(callSuper = true)
public class AvailableDevice extends AbstractDevice {

    public AvailableDevice(ObjectId deviceId, String name, ObjectId roomId, DeviceCategory category) {
        super(deviceId, name, roomId, category);
    }

}
