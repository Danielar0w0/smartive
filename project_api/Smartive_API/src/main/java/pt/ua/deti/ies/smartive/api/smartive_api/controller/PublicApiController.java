package pt.ua.deti.ies.smartive.api.smartive_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidUserException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.UserAlreadyExistsException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.UserNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.MessageResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.AvailableDevice;
import pt.ua.deti.ies.smartive.api.smartive_api.model.users.User;
import pt.ua.deti.ies.smartive.api.smartive_api.services.AvailableDeviceService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.UserService;
import pt.ua.deti.ies.smartive.api.smartive_api.tokens.JwtRequest;
import pt.ua.deti.ies.smartive.api.smartive_api.tokens.JwtResponse;
import pt.ua.deti.ies.smartive.api.smartive_api.tokens.JwtTokenUtil;
import pt.ua.deti.ies.smartive.api.smartive_api.tokens.JwtUserDetailsService;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicApiController {

    private final AvailableDeviceService availableDeviceService;
    private final UserService userService;

    // Auth
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @Autowired
    public PublicApiController(AvailableDeviceService availableDeviceService, UserService userService, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService userDetailsService) {
        this.availableDeviceService = availableDeviceService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/users/{username}")
    public User getUser(@PathVariable String username) {
        if (!userService.exists(username))
            throw new UserNotFoundException(String.format("Unable to find user %s.", username));
        return userService.getByUsername(username);
    }

    @GetMapping(value = "/devices/available")
    public List<AvailableDevice> getAllAvailableDevices() {
        return availableDeviceService.getAllAvailableDevices();
    }

    @PostMapping("/login")
    public JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {

        Authentication authResult;
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        if (username == null || password == null) {
            return new JwtResponse("Please provide a valid request.", null);
        }

        UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(username, password);

        try {
            authResult = authenticationManager.authenticate(userToken);
        } catch (DisabledException e) {
            throw new DisabledException("User is disabled.");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid credentials.");
        }

        if (authResult.isAuthenticated())
            System.out.println("User is Authenticated.");

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        return new JwtResponse("Authentication succeed.", token);
    }

    @PostMapping("/register")
    public MessageResponse registerUser(@RequestBody User user) {

        if (!user.isValid())
            throw new InvalidUserException("Invalid user. Please provide all the mandatory fields.");

        try {
            userDetailsService.registerUser(user);
        } catch (DuplicateKeyException keyException) {
            throw new UserAlreadyExistsException(String.format("A user with the email %s is already registered.", user.getEmail()));
        }

        return new MessageResponse("The user was successfully registered.");
    }
}
