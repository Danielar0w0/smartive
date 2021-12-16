import React from 'react';

import { MiniPanel } from './mini_panel'
import { Navbar } from "./navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MediumPanel} from "./medium_panel";
import {BigPanel} from "./big_panel";
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

export class Dashboard extends React.Component {

    render() {
        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>
                <Row>
                    <Col className="col-3 px-0">
                        <MiniPanel
                            icon={faTv}
                            room_name={'Living Room'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                    <Col className="col-3 px-0">
                        <MiniPanel
                            icon={faBed}
                            room_name={'Bedroom'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                    <Col className="col-3 px-0">
                        <MiniPanel
                            icon={faUtensilSpoon}
                            room_name={'Kitchen'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                    <Col className="col-3 px-0">
                        <MiniPanel
                            icon={faHome}
                            room_name={'Overall'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                </Row>

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