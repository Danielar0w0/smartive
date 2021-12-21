import React from 'react';

import { MiniPanel } from '../base_components/mini_panel';
import { Navbar } from "../base_components/navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    faTv,
    faKey,
    faBatteryEmpty
} from "@fortawesome/free-solid-svg-icons";

import { UsersList } from './users_list';

export class Users extends React.Component {

    render() {
        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <Row>
                    <Col className="col-3">
                        <MiniPanel
                            icon={faTv}
                            title={'Account'}
                            subtitle={'Devices'}
                            info={'10 total'}
                            coloredIcon
                        />
                    </Col>
                    <Col className="col-3">
                        <MiniPanel
                            icon={faKey}
                            title={'Account'}
                            subtitle={'Admin'}
                            info={'Username_X10'}
                        />
                    </Col>
                    <Col className="col-3">
                        <MiniPanel
                            icon={faBatteryEmpty}
                            title={'Account'}
                            subtitle={'Empty slots'}
                            info={'3 users'}
                        />
                    </Col>
                    <Col className="col-3">
                        <MiniPanel
                            icon={faTv}
                            title={'Account'}
                            subtitle={'Devices'}
                            info={'10 per user'}
                        />
                    </Col>
                </Row>
                

                <UsersList></UsersList>
                
            </Container> 
        );
    }
}