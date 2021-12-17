import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { MiniPanel } from "./mini_panel";

import React from 'react';
import { RestAPIHandler } from "../../utils/RestAPIHandler";

export class RoomList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            rooms: Array.of(0)
        };

    }

    componentDidMount() {
        this.apiHandler.getAllRooms()
            .then(r => {
                this.setState({isLoading: false, rooms: r})
            });
    }

    render() {

        const items = this.state.rooms;

        console.log(this.state.rooms)
        console.log(items)

        return (

            <ScrollMenu>

                {items.map(room => (
                    <MiniPanel
                        room_name={room.name}
                        power_consumption={room.stats !== undefined ? room.stats.powerConsumption : '0 kWh'}
                    />
                ))}

            </ScrollMenu>

        );

    }

}