package pt.ua.deti.ies.smartive.api.smartive_api.middleware;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.model.Room;
import pt.ua.deti.ies.smartive.api.smartive_api.model.RoomStats;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Device;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.DeviceCategory;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Sensor;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.SensorState;
import pt.ua.deti.ies.smartive.api.smartive_api.services.RoomService;
import pt.ua.deti.ies.smartive.api.smartive_api.services.SensorService;

@Component
public final class MiddlewareHandler {

    private final SensorService sensorService;
    private final RoomService roomService;

    @Autowired
    public MiddlewareHandler(SensorService sensorService, RoomService roomService) {
        this.sensorService = sensorService;
        this.roomService = roomService;
    }

    public RoomStats calculateRoomStats(ObjectId roomId) {

        double roomTemperatureSum = 0, roomHumiditySum = 0, roomPowerConsumptionSum = 0;
        int temperatureSensorsCount, humiditySensorsCount;

        if (!roomService.exists(roomId)) return null;

        Room room = roomService.getRoom(roomId);

        for (Device device : room.getDevices()) {

            if (device == null) continue;

            if (!sensorService.sensorExists(device.getDeviceId())) continue;

            Sensor sensor = sensorService.getSensorById(device.getDeviceId());

            if (sensor == null) continue;

            SensorState sensorState = sensor.getState();

            if (sensorState == null) continue;

            switch (device.getCategory()) {

                case TEMPERATURE:
                    roomTemperatureSum += sensorState.getValue();
                    break;
                case HUMIDITY:
                    roomHumiditySum += sensorState.getValue();
                    break;
            }

            roomPowerConsumptionSum += sensorState.getPowerConsumption();

        }

        temperatureSensorsCount = (int) room.getDevices().stream().filter(abstractDevice -> abstractDevice.getCategory() == DeviceCategory.TEMPERATURE).count();
        humiditySensorsCount = (int) room.getDevices().stream().filter(abstractDevice -> abstractDevice.getCategory() == DeviceCategory.HUMIDITY).count();

        double roomTemperature = temperatureSensorsCount > 0 ? roomTemperatureSum/temperatureSensorsCount : roomTemperatureSum;
        double roomHumidity = humiditySensorsCount > 0 ? roomHumiditySum/humiditySensorsCount : roomHumiditySum;

        RoomStats roomStats = new RoomStats(roomTemperature, roomHumidity, roomPowerConsumptionSum);

        room.setStats(roomStats);
        roomService.updateRoom(room);

        return roomStats;

    }

}
