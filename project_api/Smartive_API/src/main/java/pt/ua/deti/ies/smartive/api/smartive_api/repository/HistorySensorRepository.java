package pt.ua.deti.ies.smartive.api.smartive_api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistorySensorItem;

public interface HistorySensorRepository extends MongoRepository<HistorySensorItem, Long> {

}
