import axios from "axios";
import {Room} from "./entities/Room";

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

                const responseData = response.data;
                const rooms: Room[] = responseData;

                console.log(responseData);

                return rooms

            })
            .catch(error => {
                console.log(error);
                return []
            });

    }

}