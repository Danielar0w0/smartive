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
            rooms: Array.of(0),
            selectedRoom: undefined
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

    roomPanelClicked(room) {
        this.setState({ selectedRoom: room });

        if (this.props.on_room_changed !== undefined)
            this.props.on_room_changed(room);
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
                console.log('Debug 1');
                roomPanels.push(
                    <MiniPanel
                        key={room.roomId}
                        title={"Room"}
                        subtitle={room.name}
                        info={room.stats !== null && room.stats !== undefined ? room.stats.powerConsumption + ' kWh' : '0 kWh'}
                        on_click={this.roomPanelClicked.bind(this, room)}
                        selected={true}
                    />
                );
            } else {
                console.log('Debug 2');
                roomPanels.push(
                    <MiniPanel
                        key={room.roomId}
                        title={"Room"}
                        subtitle={room.name}
                        info={room.stats !== null && room.stats !== undefined ? room.stats.powerConsumption + ' kWh' : '0 kWh'}
                        on_click={this.roomPanelClicked.bind(this, room)}
                        selected={false}
                    />
                );
            }


        }

        return (

            <ScrollMenu>
                {roomPanels}
            </ScrollMenu>

        );

    }

}