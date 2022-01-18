package pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "events")
@Data
@ToString(callSuper = true)
@AllArgsConstructor
public class SensorEvent extends AbstractSensorEvent {

}
