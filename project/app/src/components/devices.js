import React from 'react';

import { MiniPanel } from './mini_panel'
import { Navbar } from "./navbar";
import Search from './searchbar';
import { FaPlusSquare } from 'react-icons/fa'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {LargePanel} from "./large_panel";

export class Devices extends React.Component{

    render(){

        return (
            <Container>

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
                
                <Row className="my-5">
                    <Col className="col-1">
                        <FaPlusSquare size={50} color='#f76540' style={{borderRadius: "15px"}}/>
                    </Col>
                    <Col className="col-3 mt-2">
                        <Search/>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <LargePanel
                            device_name={'Philips Smart Bulb'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col>
                        <LargePanel
                            device_name={'Philips Smart Bulb (2)'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LargePanel
                            device_name={'Samsung Smart TV'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col>
                        <LargePanel
                            device_name={'Xiaomi Humidity Sensor'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LargePanel
                            device_name={'Xiaomi Temperature Sensor'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col>
                        <LargePanel
                            device_name={'Xiaomi Smart IP Camera'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>

            </Container>
        );
    }
}