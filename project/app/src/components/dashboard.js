import React from 'react';

import { MiniPanel } from './base_components/mini_panel'
import { Navbar } from "./base_components/navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MediumPanel} from "./base_components/medium_panel";
import {BigPanel} from "./base_components/big_panel";
import {TabContainer} from "react-bootstrap";

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
                            room_name={'Living Room'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                    <Col className="col-3 px-0">
                        <MiniPanel
                            room_name={'Bedroom'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                    <Col className="col-3 px-0">
                        <MiniPanel
                            room_name={'Kitchen'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                    <Col className="col-3 px-0">
                        <MiniPanel
                            room_name={'Overall'}
                            power_consumption={'700 kWh'}
                        />
                    </Col>

                </Row>

                <Row className="mt-5">
                    <Col className="col-3 px-0">
                        <MediumPanel/>
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <TabContainer>
                                <MiniPanel
                                    room_name={'Water'}
                                    power_consumption={'10 L'}
                                />
                            </TabContainer>
                        </Row>
                        <Row>
                            <MiniPanel
                                room_name={'Temperature'}
                                power_consumption={'20 ºC'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
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