import React from 'react';

import {Navbar} from "./base_components/navbar";
import Search from './base_components/searchbar';
import {FaPlusSquare} from 'react-icons/fa'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DevicesList} from "./base_components/devices_list";
import {RoomPanelsList} from './base_components/room_panels_list';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export class Devices extends React.Component {

    render() {

        return (
            <Container>

                <div className="mb-4">
                    <Navbar/>
                </div>

                <RoomPanelsList/>

                <Row className="my-5">
                    <Col className="col-1">
                        <FaPlusSquare size={50} color='#f76540' style={{borderRadius: "15px"}}
                                      onClick={() => window.location.replace("/add_device")}/>
                    </Col>
                    <Col className="col-6 mt-2 me-5">
                        <Search/>
                    </Col>
                    <Col className="col mt-0">
                        <Link to="/triggers">
                            <Button className="py-3 rounded btn w-100"
                                    style={{backgroundColor: "white", borderColor: "#f76540", borderWidth: "2px"}}>
                                <span style={{color: "#f76540"}}>View Triggers</span></Button>
                        </Link>
                    </Col>
                    <Col className="col mt-0">
                        <Link to="/add_trigger">
                            <Button className="py-3 rounded btn w-100"
                                    style={{backgroundColor: "#f76540", border: "none"}}>Add Trigger</Button>
                        </Link>
                    </Col>
                </Row>

                <DevicesList/>

            </Container>
        );
    }
}