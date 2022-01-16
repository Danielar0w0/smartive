import {RestAPIHandler} from "../../utils/RestAPIHandler";

const initialState = {
    rooms: [],
    roomStats: [],
    roomDevices: []
}

const apiHandler = new RestAPIHandler();

export default function roomsReducer(state = initialState, action) {

    switch (action.type) {

        case 'rooms/roomsLoaded':
            return {
                ...state,
                rooms: action.payload
            }

        case 'rooms/roomsStatsLoaded':
            return {
                ...state,
                roomStats: [
                    ...state.roomStats,
                    {
                        roomId: action.payload.id,
                        stats: action.payload.stats,
                    }
                ]
            }

        case 'rooms/roomsDevicesLoaded':
            return {
                ...state,
                roomDevices: [
                    ...state.roomDevices,
                    {
                        roomId: action.payload.id,
                        devices: action.payload.stats,
                    }
                ]
            }

        default:
            return state

    }

}

export async function fetchRooms(dispatch, getState) {
    const response = await apiHandler.getAllRooms();
    dispatch({ type: 'rooms/roomsLoaded', payload: response })
}

export const fetchRoomStats = roomId => async dispatch => {
    const response = await apiHandler.getRoomStats(roomId);
    dispatch({ type: 'rooms/roomsStatsLoaded', payload: { id: roomId, stats: response } });
}

export const fetchRoomDevices = roomId => async dispatch => {
    const response = await apiHandler.getRoomStats(roomId);
    dispatch({ type: 'rooms/roomsStatsLoaded', payload: { id: roomId, stats: response } });
}