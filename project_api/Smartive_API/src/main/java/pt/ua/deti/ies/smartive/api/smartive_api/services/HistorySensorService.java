package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.history.HistorySensorItem;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.HistorySensorRepository;

import java.util.List;

@Service
public class HistorySensorService {

    private final HistorySensorRepository historySensorRepository;

    @Autowired
    public HistorySensorService(HistorySensorRepository historySensorRepository) {
        this.historySensorRepository = historySensorRepository;
    }

    public void save(HistorySensorItem historySensorItem) {
        historySensorRepository.save(historySensorItem);
    }

    public List<HistorySensorItem> getAllHistoryItems() {
        return historySensorRepository.findAll();
    }

}
