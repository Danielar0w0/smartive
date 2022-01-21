package pt.ua.deti.ies.smartive.api.smartive_api.model.devices.events;

import lombok.Data;

@Data
public class Trigger {

    private TriggerType type;
    private Double value;

}
