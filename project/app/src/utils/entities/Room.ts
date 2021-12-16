export class Room {

    private readonly _id: String;
    private readonly _name: String;
    private readonly _sensors: any;

    constructor(id: String, name: String, sensors: any) {
        this._id = id;
        this._name = name;
        this._sensors = sensors;
    }

    static parseJson(json: JSON) {

        if (json === undefined)
            return

        //const roomId: String = json.hasOwnProperty('id') ? undefined : json['id'];
        //const roomName: String = json.hasOwnProperty('name') ? json['name'] : undefined;

    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get sensors() {
        return this._sensors;
    }

}