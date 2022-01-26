import {RestAPIHandler} from "../../utils/RestAPIHandler";

const initialState = {
    devices: []
}

const apiHandler = new RestAPIHandler();

export default function devicesReducer(state = initialState, action) {

    switch (action.type) {

        case 'devices/devicesLoaded':
            return {
                ...state,
                devices: action.payload
            }

        default:
            return state

    }

}

export async function fetchDevices(dispatch, getState) {
    const response = await apiHandler.getAllSensors();
    dispatch({ type: 'devices/devicesLoaded', payload: response })
}