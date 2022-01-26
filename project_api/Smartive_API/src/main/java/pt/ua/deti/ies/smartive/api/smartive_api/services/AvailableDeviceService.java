package pt.ua.deti.ies.smartive.api.smartive_api.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smartive.api.smartive_api.exceptions.InvalidDeviceException;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.AvailableDevice;
import pt.ua.deti.ies.smartive.api.smartive_api.repository.AvailableDeviceRepository;

import java.util.List;

@Service
public class AvailableDeviceService {

    private final AvailableDeviceRepository availableDeviceRepository;

    @Autowired
    public AvailableDeviceService(AvailableDeviceRepository availableDeviceRepository) {
        this.availableDeviceRepository = availableDeviceRepository;
    }

    public List<AvailableDevice> getAllAvailableDevices() {
        return availableDeviceRepository.findAll();
    }

    public void save(AvailableDevice availableDevice) {
        availableDeviceRepository.save(availableDevice);
    }

    public void delete(ObjectId objectId) {

        if (!availableDeviceRepository.existsByDeviceId(objectId))
            throw new InvalidDeviceException("Unable to find a device with the id " + objectId);
        availableDeviceRepository.deleteByDeviceId(objectId);

    }

    public AvailableDevice getAvailableDevice(ObjectId deviceId) {
        return availableDeviceRepository.findByDeviceId(deviceId);
    }

    public boolean exists(ObjectId objectId) {
        return availableDeviceRepository.existsByDeviceId(objectId);
    }

}
