import {HistoryType} from "./HistoryType";

export interface HistoryItem {

    itemId: String;
    description: String;
    type: HistoryType;
    date: Date;

}
