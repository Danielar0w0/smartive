import React from 'react';

import { MiniPanel } from './mini_panel'
import { Navbar } from "./navbar";
import Search from './searchbar';
import {FaPlusSquare} from 'react-icons/fa'
import IconButton from '@mui/material/IconButton';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MediumPanel} from "./medium_panel";
import {BigPanel} from "./big_panel";
import {LargePanel} from "./large_panel";
import {TabContainer} from "react-bootstrap";

export class Devices extends React.Component{

    render(){
        let plusStyle = {color:"red"};
        return (
            <Container className="container_fluid">
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
                
                <Row>
                    <IconButton>
                        <FaPlusSquare size={70} color='red'/>
                    </IconButton>
                        <Search/>
                </Row>

                <Row>
                    <Col className="col-6 px-0">
                        <LargePanel
                            device_name={'Device 1'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col className="col-6 px-0">
                        <LargePanel
                            device_name={'Device 2'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6 px-0">
                        <LargePanel
                            device_name={'Device 1'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col className="col-6 px-0">
                        <LargePanel
                            device_name={'Device 2'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6 px-0">
                        <LargePanel
                            device_name={'Device 1'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col className="col-6 px-0">
                        <LargePanel
                            device_name={'Device 2'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>

            </Container>
        );
    }
}