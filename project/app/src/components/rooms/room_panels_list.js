import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { MiniPanel } from "../base_components/mini_panel";

import React from 'react';
import { RestAPIHandler } from "../../utils/RestAPIHandler";
import store from "../../store";
import {MiniPanelInfo} from "../base_components/mini_panel_info";

export class RoomPanelsList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            rooms: Array.of(0),
            selectedRoom: undefined
        };

    }

    componentDidMount() {

        store.subscribe(() => {
            this.setState({
                rooms: store.getState().roomsFeature.rooms
            });
        });

    }

    roomPanelClicked(room) {
        this.setState({ selectedRoom: room });
        if (this.props.on_room_changed !== undefined)
            this.props.on_room_changed(room);
    }

    removeRoom(room) {
        this.apiHandler.removeRoom(room.roomId);
    }

    render() {

        let rooms = this.state.rooms;

        rooms = rooms.sort((r1, r2) => {
            if ( r1.name < r2.name ){
                return -1;
            }
            if ( r1.name > r2.name ){
                return 1;
            }
            return 0;
        })

        let roomPanels = [];

        for (let roomIdx in rooms) {

            let room = rooms[roomIdx];

            if (this.state.selectedRoom !== undefined && room.roomId === this.state.selectedRoom.roomId)  {
                roomPanels.push(
                    <MiniPanel
                        key={room.roomId}
                        title={"Room"}
                        subtitle={room.name}
                        info={room.stats !== null && room.stats !== undefined ? room.stats.powerConsumption.toFixed(4) + ' kWh' : '0 kWh'}
                        on_click={this.roomPanelClicked.bind(this, room)}
                        selected={true}
                        isCloseable={true}
                        onCloseClick={this.removeRoom.bind(this, room)}
                    />
                );
            } else {
                roomPanels.push(
                    <MiniPanel
                        key={room.roomId}
                        title={"Room"}
                        subtitle={room.name}
                        info={room.stats !== null && room.stats !== undefined ? room.stats.powerConsumption.toFixed(4) + ' kWh' : '0 kWh'}
                        on_click={this.roomPanelClicked.bind(this, room)}
                        selected={false}
                        isCloseable={true}
                        onCloseClick={this.removeRoom.bind(this, room)}
                    />
                );
            }

        }

        roomPanels.push(
            <MiniPanelInfo title={"Add new room"} on_click={() => window.location.replace("/create_room")} />
        );

        return (

            <ScrollMenu>
                {roomPanels}
            </ScrollMenu>

        );

    }

}