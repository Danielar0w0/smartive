package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidUserException;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.UserNotFoundException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.User;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.UserRepository;
import java.util.ArrayList;

@Service
@Component
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(User user) {
        if (!user.isValid())
            throw new InvalidUserException("Invalid user - invalid instance.");
        userRepository.save(user);
    }

    public User getUser(String username) throws UserNotFoundException {
        if ("javainuse".equals(username)) {
            return new User(null, "javainuse", "javainuse@ua.pt", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6");
        } else {
            throw new UserNotFoundException("User not found - username " + username);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("javainuse".equals(username)) {
            return new User(null, "javainuse", "javainuse@ua.pt", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6");
        } else {
            throw new UserNotFoundException("User not found - username " + username);
        }
    }
}
