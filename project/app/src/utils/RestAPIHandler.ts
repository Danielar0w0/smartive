import axios from "axios";
import {Room} from "./entities/Room";
import {Device} from "./entities/Device";
import {SensorStat} from "./entities/SensorStat";
import {Sensor} from "./entities/Sensor";
import {RoomStats} from "./entities/RoomStats";
import { User } from "./entities/User";
import {Event} from "./entities/Event";
import { authHeader } from "./AuthHeader";
import {UserStats} from "./entities/UserStats";
import {HistoryItem} from "./entities/HistoryItem";
import {HistoryAggregationResult} from "./entities/HistoryAggregationResult";


export class RestAPIHandler {

    private readonly _middlewareBaseURI;
    private readonly _publicAPIBaseURI;
    private readonly _usersAPIBaseURI;

    constructor() {
        this._middlewareBaseURI = 'http://' + process.env.REACT_APP_API_ADDRESS + ':8080/middleware';
        this._publicAPIBaseURI = 'http://' + process.env.REACT_APP_API_ADDRESS + ':8080/public';
        this._usersAPIBaseURI = 'http://' + process.env.REACT_APP_API_ADDRESS + ':8080/api'
    }

    getAllRooms(): Promise<Room[]> {

        const endpointURI = '/rooms'
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
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
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
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
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
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

        return axios.get(requestURI, {headers: authHeader()})
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
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.delete(requestURI, {headers: authHeader()})
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
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.post(requestURI, device, {headers: authHeader()})
            .then((response) => {
                console.log(response);
                return response.status === 200;
            })
            .catch(error => {
                console.log("Error on API request (registerNewDevice()): " + error.message)
                return false
            });

    }

    getRoomStats(roomId: string): Promise<RoomStats | null> {

        const endpointURI = `/rooms/${roomId}/stats`
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {
                const roomStats: RoomStats = response.data;
                return roomStats;
            })
            .catch(error => {
                console.log("Error on API request (getRoomStats()): " + error.message)
                return null;
            });

    }

    getRoomSensors(roomId: string): Promise<any|null> {

        const endpointURI = `/devices/sensors/${roomId}`
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {
                return response.data;
            }).catch(error => {
                console.log("Error on API request (getRoomStats()): " + error.message)
                return null;
            })

    }

    registerRoom(roomName: string): Promise<boolean | null> {

        const endpointURI = "/rooms"
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.post(requestURI, {name: roomName}, {headers: authHeader()})
            .then((response) => {
                return response.status === 200;
            })
            .catch(error => {
                console.log("Error on API request (registerRoom()): " + error.message);
                return false;
            });

    }

    removeRoom(roomId: string): Promise<boolean | null> {

        const endpointURI = `/rooms/${roomId}`
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.delete(requestURI, {headers: authHeader()})
            .then((response) => {
                return response.status === 200;
            })
            .catch(error => {
                console.log("Error on API request (removeRoom()): " + error.message);
                return false;
            });

    }

    addSensorEvent(event: Event): Promise<boolean> {

        const endpointURI = '/devices/sensors/events'
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.post(requestURI, event, {headers: authHeader()})
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
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {
                const allEvents: Event[] = response.data;
                return allEvents
            })
            .catch(error => {
                console.log("Error on API request (getAvailableDevices()): " + error.message)
                return []
            });
    }

    getHistory(): Promise<HistoryItem[]> {

        const endpointURI = '/history'
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {

                const history: HistoryItem[] = response.data;
                return history

            })

            .catch(error => {
                console.log("Error on API request (getHistory()): " + error.message)
                return []
            });
    }

    getHistoryTriggers(): Promise<HistoryItem[]> {

        const endpointURI = `/history/TRIGGERS`
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {

                const history: HistoryItem[] = response.data;
                return history

            })

            .catch(error => {
                console.log("Error on API request (getHistoryTriggers()): " + error.message)
                return []
            });
    }

    getHistoryDevices(): Promise<HistoryItem[]> {

        const endpointURI = `/history/DEVICES`
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {

                const history: HistoryItem[] = response.data;
                return history

            })

            .catch(error => {
                console.log("Error on API request (getHistoryDevices()): " + error.message)
                return []
            });
    }

    getHistoryRooms(): Promise<HistoryItem[]> {

        const endpointURI = `/history/ROOMS`
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {

                const history: HistoryItem[] = response.data;
                return history

            })

            .catch(error => {
                console.log("Error on API request (getHistoryRooms()): " + error.message)
                return []
            });
    }

    login(user: User): Promise<boolean> {

        const endpointURI = '/login';
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.post(requestURI, user, {headers: authHeader()})
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user",
                        JSON.stringify(response.data.token).replace('"', '').replace('\"', '').trim());
                }
                return true;
            })
            .catch(error => {
                console.log("Error on API request (login()): " + error.message)
                return false;
            });
    }

    register(user: User) {

        const endpointURI = '/register';
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.post(requestURI, user, {headers: authHeader()})
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user",
                        JSON.stringify(response.data).replace("\"", "").trim());
                }
                return true;
            })
            .catch(error => {
                console.log("Error on API request (register()): " + error.message)
                return false;
            });
    }

    getUserStats(): Promise<UserStats | null> {

        const endpointURI = '/user/stats';
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {
                const userStats: UserStats = response.data;
                return userStats
            })
            .catch(error => {
                console.log("Error on API request (getUserStats()): " + error.message)
                return null
            });

    }

    getUserDetails(): Promise<User | null> {

        const endpointURI = '/user';
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {
                const user: User = response.data;
                return user
            })
            .catch(error => {
                console.log("Error on API request (getUserDetails()): " + error.message)
                return null
            });
    }

    getUser(username: String): Promise<User | null> {

        const endpointURI = `/users/${username}`;
        const requestURI = this._publicAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {
                const user: User = response.data;
                return user
            })
            .catch(error => {
                console.log("Error on API request (getUser()): " + error.message)
                return null
            });
    }

    addUserToRoom(user: User, roomId: String): Promise<boolean | null> {

        const endpointURI = `/rooms/${roomId}/users`
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.patch(requestURI, user, {headers: authHeader()})
            .then((response) => {
                return response.status === 200;
            })
            .catch(error => {
                console.log("Error on API request (addUserToRoom()): " + error.message);
                return false;
            });

    }

    getHistoryAggregation(sensorId: number) {

        const endpointURI = `/history/sensor/${sensorId}/aggregation`;
        const requestURI = this._usersAPIBaseURI + endpointURI;

        return axios.get(requestURI, {headers: authHeader()})
            .then((response) => {
                const aggregationResult: HistoryAggregationResult = response.data;
                return aggregationResult
            })
            .catch(error => {
                console.log("Error on API request (getHistoryAggregation()): " + error.message)
                return null
            });

    }

}