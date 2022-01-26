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

        case 'devices/devicesHistoryLoaded':
            return {
                ...state,
                roomDevices: [
                    ...state.roomDevices,
                    {
                        deviceId: action.payload.id,
                        history: action.payload.history,
                    }
                ]
            }

        default:
            return state

    }

}

export async function fetchDevices(dispatch, getState) {
    const response = await apiHandler.getAllSensors();
    dispatch({ type: 'devices/devicesLoaded', payload: response })
}

export const fetchDeviceHistory = deviceId => async dispatch => {
    const response = await apiHandler.getDeviceHistory(deviceId);
    dispatch({ type: 'devices/devicesHistoryLoaded', payload: { id: deviceId, history: response } });
}