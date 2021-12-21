import React from 'react';

import { Navbar } from "./base_components/navbar";
import Search from './base_components/searchbar';
import { FaPlusSquare } from 'react-icons/fa'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {RoomList} from "./base_components/room_list";
import {DeviceList} from "./add_devices/device_list";
import {DevicesList} from "./base_components/devices_list";

export class Devices extends React.Component{

    render(){

        return (
            <Container>

                <div className="mb-4">
                    <Navbar/>
                </div>
                
                <RoomPanelsList/>
                
                <Row className="my-5">
                    <Col className="col-1">
                        <FaPlusSquare size={50} color='#f76540' style={{borderRadius: "15px"}} onClick={() => window.location.replace("/add_device")}/>
                    </Col>
                    <Col className="col-3 mt-2">
                        <Search/>
                    </Col>
                </Row>

                <DevicesList/>

            </Container>
        );
    }
}