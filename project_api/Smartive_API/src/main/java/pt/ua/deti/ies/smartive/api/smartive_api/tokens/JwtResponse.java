package pt.ua.deti.ies.smartive.api.smartive_api.tokens;


public class JwtResponse {

    private String message;
    private String jwttoken;

    public JwtResponse(String message, String jwttoken) {
        this.message = message;
        this.jwttoken = jwttoken;
    }
}

/*

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }
}
*/