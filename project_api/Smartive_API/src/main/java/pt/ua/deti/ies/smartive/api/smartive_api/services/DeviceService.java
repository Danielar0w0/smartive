package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Device;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.DeviceRepository;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

}