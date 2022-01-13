import {RestAPIHandler} from "../../utils/RestAPIHandler";

const initialState = []

const apiHandler = new RestAPIHandler();

export default function roomsReducer(state = initialState, action) {

    switch (action.type) {

        case 'rooms/roomsLoaded':
            return action.payload

        default:
            return state

    }

}

export async function fetchRooms(dispatch, getState) {
    const response = await apiHandler.getAllRooms();
    dispatch({ type: 'rooms/roomsLoaded', payload: response })
}