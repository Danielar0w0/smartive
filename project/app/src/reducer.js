import { combineReducers } from 'redux';
import roomsReducer from "./features/rooms/roomsReducer";
import devicesReducer from "./features/devices/devicesReducer";

const rootReducer = combineReducers({
    roomsFeature: roomsReducer,
    devicesFeature: devicesReducer,
});

export default rootReducer;