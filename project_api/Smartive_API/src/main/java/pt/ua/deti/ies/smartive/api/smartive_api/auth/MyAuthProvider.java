package pt.ua.deti.ies.smartive.api.smartive_api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.tokens.JwtUserDetailsService;


@Component
public class MyAuthProvider implements AuthenticationProvider {

    private JwtUserDetailsService userDetailsService;

    @Autowired
    public MyAuthProvider(JwtUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        // Get the User from UserDetailsService
        String providedUsername = authentication.getPrincipal().toString();
        UserDetails user = userDetailsService.loadUserByUsername(providedUsername);

        String providedPassword = authentication.getCredentials().toString();
        String correctPassword = user.getPassword();

        // Authenticate
        // If Passwords don't match throw and exception
        if (!providedPassword.equals(correctPassword)) {
            throw new BadCredentialsException("Incorrect Credentials...");
        }

        System.out.println("Passwords Match...");

        // return Authentication Object
        return new UsernamePasswordAuthenticationToken(user, authentication.getCredentials(), user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
