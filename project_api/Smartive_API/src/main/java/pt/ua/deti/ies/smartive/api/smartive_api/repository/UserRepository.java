package pt.ua.deti.ies.smartive.api.smartive_api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.smartive.api.smartive_api.model.users.User;

public interface UserRepository extends MongoRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
}
