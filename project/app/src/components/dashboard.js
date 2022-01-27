import React from 'react';

import { MiniPanel } from './base_components/mini_panel'
import { Navbar } from "./base_components/navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MediumPanel} from "./base_components/medium_panel";
import {BigPanel} from "./base_components/big_panel";
import {TabContainer} from "react-bootstrap";
import {
    faWater,
    faPlug,
    faLightbulb,
    faTemperatureHigh
} from "@fortawesome/free-solid-svg-icons";
import {RoomPanelsList} from "./base_components/room_panels_list";
import {RestAPIHandler} from "../utils/RestAPIHandler";
import store from "../store";
import roomsReducer, {fetchRoomStats} from "../features/rooms/roomsReducer";

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            selectedRoom: undefined,
            selectedRoomStats: {}
        }

    }

    roomChangedHandler(room) {

        this.apiHandler.getRoomSensors(room.roomId)
            .then(sensors => {
                this.setState({
                    devices: sensors
                });
                console.log('Devices')
                console.log(this.state.devices)
            });

        store.dispatch(fetchRoomStats(room.roomId));

        store.subscribe(() => {

            let allRoomsStats = store.getState().roomsFeature.roomStats;

            for (let roomStatIdx in allRoomsStats) {
                let roomStats = allRoomsStats[roomStatIdx];
                if (roomStats.roomId === room.roomId) {
                    this.setState({
                        selectedRoom: room.roomId,
                        selectedRoomStats: roomStats.stats
                    });
                }
            }

        })

    }

    render() {

        let roomStats = this.state.selectedRoomStats;

        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <RoomPanelsList on_room_changed={this.roomChangedHandler.bind(this)} />

                <Row className="mt-5">
                    <Col className="col-3 px-0">
                        <MediumPanel 
                            icon={faPlug}
                            title={'Devices'}
                            subtitle={'Energy'}
                            info={roomStats !== null && roomStats.powerConsumption !== undefined ? roomStats.powerConsumption + " kWh" : 'No Data'}
                        />
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <TabContainer>
                                <MiniPanel
                                    icon={faWater}
                                    title={'Devices'}
                                    subtitle={'Water'}
                                    info={roomStats !== null && roomStats.water !== undefined ? roomStats.water + " L" : 'No Data'}
                                />
                            </TabContainer>
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faTemperatureHigh}
                                title={'Devices'}
                                subtitle={'Temperature'}
                                info={roomStats !== null && roomStats.temperature !== undefined ? roomStats.temperature.toFixed(2) + " ºC" : 'No Data'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faLightbulb}
                                title={'Devices'}
                                subtitle={'Humidity'}
                                info={roomStats !== null && roomStats.humidity !== undefined ? roomStats.humidity.toFixed(2) + " g/m³" : 'No Data'}
                            />
                        </Row>
                    </Col>
                    <Col className="col-6">
                        <BigPanel title={"Room Overview"} subtitle={"Devices average value and combined power consumption"} devices={this.state.devices} columns={['Sensor Name', 'Total Power Consumption', 'Average Value']} />
                    </Col>
                </Row>

            </Container>
        );
    }

}