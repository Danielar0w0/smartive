package pt.ua.deti.ies.smartive.api.smartive_api.model.devices;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SensorState extends DeviceState {

    private boolean status;
    private final Double value;
    private final String unit;

}