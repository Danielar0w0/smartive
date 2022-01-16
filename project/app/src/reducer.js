import { combineReducers } from 'redux';
import roomsReducer from "./features/rooms/roomsReducer";

const rootReducer = combineReducers({
    roomsFeature: roomsReducer,
});

export default rootReducer;