package pt.ua.deti.ies.smartive.api.smartive_api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistoryType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistoryItem;

import java.util.List;

public interface HistoryRepository extends MongoRepository<HistoryItem, Long> {
    List<HistoryItem> findByType(HistoryType historyType);
}
