import {RestAPIHandler} from "../../utils/RestAPIHandler";
import {HistoryType} from "../../utils/entities/HistoryType";

const initialState = {
    historyType: undefined,
    historyItems: []
}

const apiHandler = new RestAPIHandler();

export default function historyReducer(state = initialState, action) {

    switch (action.type) {

        case 'history/historyLoaded':
            return {
                ...state,
                historyType: undefined,
                historyItems: action.payload
            }

        case 'history/historyDevicesLoaded':
            return {
                ...state,
                historyType: HistoryType[0],
                historyItems: action.payload
            }

        case 'history/historyRoomsLoaded':
            return {
                ...state,
                historyType: HistoryType[1],
                historyItems: action.payload
            }

        case 'history/historyTriggersLoaded':
            return {
                ...state,
                historyType: HistoryType[2],
                historyItems: action.payload
            }

        default:
            return state

    }

}

export async function fetchHistory(dispatch, getState) {
    const response = await apiHandler.getHistory();
    dispatch({ type: 'history/historyLoaded', payload: response })
}

export async function fetchHistoryDevices(dispatch, getState) {
    const response = await apiHandler.getHistoryDevices();
    dispatch({ type: 'history/historyDevicesLoaded', payload: response })
}

export async function fetchHistoryRooms(dispatch, getState) {
    const response = await apiHandler.getHistoryRooms();
    dispatch({ type: 'history/historyRoomsLoaded', payload: response })
}

export async function fetchHistoryTriggers(dispatch, getState) {
    const response = await apiHandler.getHistoryTriggers();
    dispatch({ type: 'history/historyTriggersLoaded', payload: response })
}