import { combineReducers } from 'redux';
import roomsReducer from "./features/rooms/roomsReducer";

const rootReducer = combineReducers({
    rooms: roomsReducer,
});

export default rootReducer;