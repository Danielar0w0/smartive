import {TriggerDetails} from "./TriggerDetails";

export interface Event {

    sensorId: String;
    targetId: String;
    event: String;
    trigger: TriggerDetails;

}