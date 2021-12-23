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

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            selectedRoomStats: {}
        }

    }


    roomChangedHandler(room) {

        this.apiHandler.getRoomStats(room.roomId)
            .then(roomStats => {
                this.setState({selectedRoomStats: roomStats !== null ? roomStats : {}});
            });

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
                            info={'No Data'}
                        />
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <TabContainer>
                                <MiniPanel
                                    icon={faWater}
                                    title={'Devices'}
                                    subtitle={'Water'}
                                    info={roomStats.water !== undefined ? roomStats.water + " L" : 'No Data'}
                                />
                            </TabContainer>
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faTemperatureHigh}
                                title={'Devices'}
                                subtitle={'Temperature'}
                                info={roomStats.temperature !== undefined ? roomStats.temperature.toFixed(2) + " ºC" : 'No Data'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faLightbulb}
                                title={'Devices'}
                                subtitle={'Humidity'}
                                info={roomStats.humidity !== undefined ? roomStats.humidity.toFixed(2) + " g/m³" : 'No Data'}
                            />
                        </Row>
                    </Col>
                    <Col className="col-6">
                        <BigPanel/>
                    </Col>
                </Row>

            </Container>
        );
    }

}