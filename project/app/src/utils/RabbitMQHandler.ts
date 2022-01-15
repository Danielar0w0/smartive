// @ts-ignore
import Stomp, { Client, Subscription } from 'stompjs';
import {RabbitMQNotificationType} from "./RabbitMQNotificationType";

export class RabbitMQHandler {

    private readonly _username: string;
    private readonly _password: string;
    private readonly _websocket: WebSocket;
    private readonly _client: Client;

    private readonly _subscriptions: Array<Subscription>;

    constructor(username: string, password: string, webSocketAddress: string) {
        this._username = username;
        this._password = password;
        this._websocket = new WebSocket(webSocketAddress);
        this._client = Stomp.over(this._websocket)
        this._subscriptions = [];
    }

    public connect(): void {

        let on_success = () => {

            console.log('Connected to RabbitMQ.');

            this._subscriptions.push(this.client.subscribe('notifiers_reactJS', (message: any) => {
                // TODO: Update app data.
                let notification: any = JSON.parse(message.body);

                switch (notification['notification']) {
                    case RabbitMQNotificationType[RabbitMQNotificationType.ROOM_ADDED]:
                        console.log("Room Added")
                }

                console.log('Received message from RabbitMQ: ' + message);

            }));

        };

        let on_error = (error: any) => {
            console.log("Error with RabbitMQ connection: ");
            console.log(error);
        }

        this.client.connect(this.username, this.password, on_success, on_error, '/');

    }

    public sendMessage(message: string): void {
        this.client.send('notifiers_reactJS', {}, message);
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get websocket(): WebSocket {
        return this._websocket;
    }

    get client(): Client {
        return this._client;
    }

    get subscriptions(): Array<Subscription> {
        return this._subscriptions;
    }

}

