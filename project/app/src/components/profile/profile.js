import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { ProfilePanel } from './profile_panel';
import { MiniPanel } from '../base_components/mini_panel';
import { Navbar } from "../base_components/navbar";

import {
    faTv,
    faWater,
    faPlug,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'react-bootstrap';
import store from "../../store";
import {fetchDevices} from "../../features/devices/devicesReducer";
import {RestAPIHandler} from "../../utils/RestAPIHandler";

export class Profile extends React.Component {
    
    constructor(props) {    
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            user_name: '',
            user_email: '',
            roomsCount: 0,
            devicesCount: 0,
        }

    }

    componentDidMount() {

        let requests = [
            this.apiHandler.getUserStats(),
            this.apiHandler.getUserDetails()
        ]

        Promise.allSettled(requests).then(values => {
            this.setState({
                roomsCount: values[0].value.roomsCount,
                devicesCount: values[0].value.devicesCount,
                user_name: values[1].value.username,
                user_email: values[1].value.email
            })
        })

    }

    render() {
        return(
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <Row className="mt-5 justify-content-center d-flex">
                    <Col className='col-4'>
                        <ProfilePanel user_name={this.state.user_name} user_email={this.state.user_email}/>
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <MiniPanel
                                icon={faTv}
                                title={'Account'}
                                subtitle={'Rooms'}
                                info={this.state.roomsCount + ' rooms'}
                                coloredIcon
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faPlug}
                                title={'Account'}
                                subtitle={'Devices'}
                                info={this.state.devicesCount + ' devices'}
                            />
                        </Row>
                        {/*<Row>
                            <MiniPanel
                                icon={faWater}
                                title={'Average'}
                                subtitle={'Water'}
                                info={'40 L monthly'}
                            />
                        </Row>*/}
                        <Row className="justify-content-center d-flex">
                            <Button disabled className="py-4 mt-3 rounded" style={{width: "90%", backgroundColor: "#f76540", border: "none"}}>Change Password
                                <FontAwesomeIcon icon={faEdit} style={{fontSize: "115%", color: "white", minWidth: "45px"}}/>
                            </Button>
                        </Row> 
                    </Col>
                </Row>
            </Container>
        );
    }
}