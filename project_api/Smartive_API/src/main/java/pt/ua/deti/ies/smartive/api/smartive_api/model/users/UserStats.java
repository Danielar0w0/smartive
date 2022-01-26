package pt.ua.deti.ies.smartive.api.smartive_api.model.users;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStats {

    private int roomsCount;
    private int devicesCount;

}
