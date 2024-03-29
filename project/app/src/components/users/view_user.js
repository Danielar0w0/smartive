import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { UserPanel } from './user_panel';
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

export class ViewUsers extends React.Component {
    
    constructor(props) {    
        super(props);
    }

    render() {

        return(
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <Row className="mt-5 justify-content-center d-flex">
                    <Col className='col-4'>
                        <UserPanel></UserPanel>
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <MiniPanel
                                icon={faTv}
                                title={'Account'}
                                subtitle={'Devices'}
                                info={'10 total'}
                                coloredIcon
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faPlug}
                                title={'Average'}
                                subtitle={'Electricity'}
                                info={'200 kwh monthly'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faWater}
                                title={'Average'}
                                subtitle={'Water'}
                                info={'40 L monthly'}
                            />
                        </Row>
                        <Row className="justify-content-center d-flex">
                            <Button className="py-4 mt-3 rounded" style={{width: "90%", backgroundColor: "white", borderColor: "#f76540", borderWidth: "2px"}}>
                                <span style={{color: "#f76540"}}>Change Permissions</span>
                                <FontAwesomeIcon icon={faEdit} style={{fontSize: "115%", color: "#f76540", minWidth: "45px"}}/>
                            </Button>
                        </Row> 
                    </Col>
                </Row>
            </Container>
        );
    }
}