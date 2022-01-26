package pt.ua.deti.ies.smartive.api.smartive_api.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Auth Manager
 *
 * Class to manage the authentication system and perform actions taking into account
 * the current user of the system.
 */
@Component
public final class AuthHandler {

    public Authentication getAuthenticationInstance() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public String getUserName() {
        return getAuthenticationInstance().getName();
    }

    public boolean isAdmin() {
        return getAuthenticationInstance().getName().equals("admin");
    }

}
