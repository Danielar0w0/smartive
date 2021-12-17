export interface Room {

    id: String;
    name: String;
    stats: { temperature: number, humidity: number, powerConsumption: number };
    sensors: any;

}