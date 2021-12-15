package pt.ua.deti.ies.smartive.api.smartive_api.model.devices;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Device {

    @Id
    @Field("_id")
    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId deviceId;
    private String name;
    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId roomId;
    private DeviceCategory category;

}
