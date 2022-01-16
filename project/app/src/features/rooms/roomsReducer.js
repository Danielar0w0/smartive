import {RestAPIHandler} from "../../utils/RestAPIHandler";

const initialState = []

const apiHandler = new RestAPIHandler();

export default function roomsReducer(state = initialState, action) {

    switch (action.type) {

        case 'rooms/roomsLoaded':
            return {
                ...state,
                rooms: action.payload
            }

        case 'rooms/roomsStatesLoaded':
            return {
                ...state,
                roomStats: [
                    ...state.roomStats,
                    {
                        roomId: action.payload.roomId,
                        stats: action.payload.stats,
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

export async function fetchRoomsStates(dispatch, getState, roomId) {
    const response = await apiHandler.getRoomStats(roomId);
    dispatch({ type: 'rooms/roomsStatesLoaded', payload: { id: roomId, stats: response } });
}