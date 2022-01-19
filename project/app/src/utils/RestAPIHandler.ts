import axios from "axios";
import {Room} from "./entities/Room";
import {Device} from "./entities/Device";
import {SensorStat} from "./entities/SensorStat";
import {Sensor} from "./entities/Sensor";
import {RoomStats} from "./entities/RoomStats";
import {Event} from "./entities/Event";

export class RestAPIHandler {

    private readonly _middlewareBaseURI;
    private readonly _publicAPIBaseURI;

    constructor() {
        this._middlewareBaseURI = 'http://localhost:8080/middleware';
        this._publicAPIBaseURI = 'http://localhost:8080/api'
    }

    getAllRooms(): Promise<Room[]> {

        const endpointURI = '/rooms'
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.get(requestURI)
            .then((response) => {

                const rooms: Room[] = response.data;
                return rooms

            })

            .catch(error => {
                console.log("Error on API request (getAllRooms()): " + error.message)
                return []
            });

    }

    getAllSensors(): Promise<Sensor[]> {

        const endpointURI = '/devices/sensors'
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.get(requestURI)
            .then((response) => {
                const sensors: Sensor[] = response.data;
                return sensors
            })
            .catch(error => {
                console.log("Error on API request (getAllSensors()): " + error.message)
                return []
            });

    }

    getSensorStats(sensorId: String): Promise<SensorStat | null> {

        const endpointURI = `/devices/sensor/${sensorId}`
        const requestURI = this._middlewareBaseURI + endpointURI;

        return axios.get(requestURI)
            .then((response) => {
                const sensorsStats: SensorStat = response.data;
                return sensorsStats
            })
            .catch(error => {
                console.log("Error on API request (getSensorsStats()): " + error.message)
                return null
            });

    }

    getAvailableDevices(): Promise<Device[]> {

        const endpointURI = '/devices/available'
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.get(requestURI)
            .then((response) => {
                const availableDevices: Device[] = response.data;
                return availableDevices
            })
            .catch(error => {
                console.log("Error on API request (getAvailableDevices()): " + error.message)
                return []
            });

    }

    deleteAvailableDevice(device: Device): Promise<boolean> {

        const endpointURI = `/devices/available/${device.deviceId}`
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.delete(requestURI)
            .then(() => {
                return true
            })
            .catch(error => {
                console.log("Error on API request (deleteAvailableDevice()): " + error.message)
                return false
            });

    }

    registerNewDevice(device: Device): Promise<boolean> {

        const endpointURI = '/devices/sensors/register'
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.post(requestURI, device)
            .then((response) => {
                console.log(response);
                return response.status === 200;
            })
            .catch(error => {
                console.log("Error on API request (registerNewDevice()): " + error.message)
                return false
            });

    }

    getRoomStats(roomId: number): Promise<RoomStats | null> {

        const endpointURI = `/rooms/${roomId}/stats`
        const requestURI = this._middlewareBaseURI + endpointURI;

        return axios.get(requestURI)
            .then((response) => {
                const roomStats: RoomStats = response.data;
                return roomStats;
            })
            .catch(error => {
                console.log("Error on API request (getRoomStats()): " + error.message)
                return null;
            });

    }

    addSensorEvent(event: Event): Promise<boolean> {

        const endpointURI = '/devices/sensors/events'
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.post(requestURI, event)
            .then((response) => {
                console.log(response);
                return response.status === 200;
            })
            .catch(error => {
                console.log("Error on API request (addSensorEvent()): " + error.message)
                return false
            });
    }

    getAllEvents() : Promise<Event[]> {

        const endpointURI = '/devices/sensors/events'
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.get(requestURI)
            .then((response) => {
                const allEvents: Event[] = response.data;
                return allEvents
            })
            .catch(error => {
                console.log("Error on API request (getAvailableDevices()): " + error.message)
                return []
            });
    }
}