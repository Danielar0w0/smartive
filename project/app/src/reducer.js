import { combineReducers } from 'redux';
import roomsReducer from "./features/rooms/roomsReducer";
import devicesReducer from "./features/devices/devicesReducer";
import toastsReducer from "./features/toasts/toastsReducer";
import historyReducer from "./features/history/historyReducer";

const rootReducer = combineReducers({
    roomsFeature: roomsReducer,
    devicesFeature: devicesReducer,
    toastsFeature: toastsReducer,
    historyFeature: historyReducer,
});

export default rootReducer;