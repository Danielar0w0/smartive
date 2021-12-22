import {Device} from "./Device";
import {SensorStat} from "./SensorStat";

export interface Sensor extends Device {
    sensorStats: SensorStat;
}