package pt.ua.deti.ies.smartive.api.smartive_api.tokens;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {

    private String message;
    private String token;

}