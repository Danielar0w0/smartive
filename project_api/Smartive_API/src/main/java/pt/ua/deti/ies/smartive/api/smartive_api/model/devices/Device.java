package pt.ua.deti.ies.smartive.api.smartive_api.model.devices;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "devices")
@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Device extends AbstractDevice {

    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId roomId;

    public Device(ObjectId deviceId, String name, ObjectId roomId, DeviceCategory category) {
        super(deviceId, name, category);
        this.roomId = roomId;
    }

}
