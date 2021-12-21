import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { MiniPanel } from "./mini_panel";

import React from 'react';
import { RestAPIHandler } from "../../utils/RestAPIHandler";

export class RoomPanelsList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            rooms: Array.of(0)
        };

    }

    componentDidMount() {

        this.refreshData();

        setInterval(() => {
            this.refreshData();
        }, 5000);

    }

    refreshData() {

        this.apiHandler.getAllRooms()
            .then(allRooms => {
                this.setState({isLoading: false, rooms: allRooms});
            });

    }


    render() {

        const items = this.state.rooms;

        return (

            <ScrollMenu>

                {items.map(room => (
                    <MiniPanel
                        room_name={room.name}
                        power_consumption={room.stats !== null && room.stats !== undefined ? room.stats.powerConsumption + ' kWh' : '0 kWh'}
                    />
                ))}

            </ScrollMenu>

        );

    }

}