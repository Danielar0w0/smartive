package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistoryType;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistoryItem;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.HistoryRepository;

import java.util.List;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public HistoryItem saveHistory(HistoryItem historyItem) {
        return historyRepository.save(historyItem);
    }

    public List<HistoryItem> getAllHistory() {
        return historyRepository.findAll();
    }

    public List<HistoryItem> getAllHistory(HistoryType historyType) {
        return historyRepository.findByType(historyType);
    }

}
