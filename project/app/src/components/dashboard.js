import React from 'react';

import { MiniPanel } from './mini_panel'
import { Navbar } from "./navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MediumPanel} from "./medium_panel";
import {BigPanel} from "./big_panel";
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
                                    room_name={'Overall'}
                                    power_consumption={'700 kWh'}
                                />
                            </TabContainer>
                        </Row>
                        <Row>
                            <MiniPanel
                                room_name={'Overall'}
                                power_consumption={'700 kWh'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                room_name={'Overall'}
                                power_consumption={'700 kWh'}
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