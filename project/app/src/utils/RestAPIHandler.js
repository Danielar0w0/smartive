import axios from "axios";

export class RestAPIHandler {

    constructor() {
        this.middlewareBaseURI = 'http://localhost:8080/middleware';
        this.publicAPIBaseURI = 'http://localhost:8080/api'
    }

    getAllRooms() {

        const endpointURI = '/rooms'
        const requestURI = this.publicAPIBaseURI + endpointURI;

        axios.get(requestURI)
        .then((response) => {

            const responseData = response.data;

            console.log(responseData);

        })
        .catch(error => console.log(error));

    }

}