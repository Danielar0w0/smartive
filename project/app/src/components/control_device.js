import React from 'react';

import { MiniPanel } from './base_components/mini_panel';
import { Navbar } from "./base_components/navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { faLightbulb, faPlug, faCheck } from '@fortawesome/free-solid-svg-icons';
import { DevicePanel } from './base_components/device_panel';


export class ControlDevice extends React.Component {

    render() {
        return (
            
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <Row className="mt-5 justify-content-center d-flex">
                    <Col className='col-4'>
                        <DevicePanel></DevicePanel>
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <MiniPanel
                                icon={faLightbulb}
                                title={'Device'}
                                subtitle={'Light'}
                                info={'60 %'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faPlug}
                                title={'Current'}
                                subtitle={'Electricity'}
                                info={'10 kwh'}
                            />
                        </Row>
                        <Row>
                            <MiniPanel
                                icon={faCheck}
                                title={'Device'}
                                subtitle={'Currently on'}
                                info={'10 min today'}
                                selected
                            />
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

}