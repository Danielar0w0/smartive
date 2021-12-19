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
    faHome,
    faTv,
    faBed,
    faUtensilSpoon,
    faWater,
    faPlug,
    faLightbulb,
    faTemperatureHigh
} from "@fortawesome/free-solid-svg-icons";
import {RoomPanelsList} from "./base_components/room_panels_list";

export class Dashboard extends React.Component {

    render() {
        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <RoomPanelsList/>

                <Row className="mt-5">
                    <Col className="col-3 px-0">
                        <MediumPanel icon={faPlug}/>
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <TabContainer>
                                <MiniPanel
                                    icon={faWater}
                                    room_name={'Water'}
                                    power_consumption={'10 L'}
                                />
                            </TabContainer>
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faTemperatureHigh}
                                room_name={'Temperature'}
                                power_consumption={'20 ºC'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faLightbulb}
                                room_name={'Light'}
                                power_consumption={'60 %'}
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