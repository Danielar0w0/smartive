package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.users.User;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean exists(String username) {
        return userRepository.existsByUsername(username);
    }

}
