import React from 'react';

import { Navbar } from "./base_components/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TabContainer } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card'

export class ControlDevice extends React.Component {

    render() {
        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>
                <Row className="mt-5 d-flex justify-content-center">
                    <Col className="col-3 px-0">
                        <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                            <Container className="my-3">
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{maxHeight: "8rem", maxWidth: "8rem"}} alt="Logo"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text-center fw-bolder">Device</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button className="mx-1"><FontAwesomeIcon icon={faPowerOff} /></Button>
                                        <Button className="mx-1"><FontAwesomeIcon icon={faPlus} /></Button>
                                        <Button className="mx-1"><FontAwesomeIcon icon={faMinus} /></Button>
                                    </Col>
                                </Row>
                            </Container>

                        </Card>
                    </Col>
                    <Col className="col-3">
                        <Row>
                            <TabContainer>
                                <Card className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "90%"}}>
                                    <Row>
                                        <Col className="col mx-3" >
                                            <p className="fs-6 fw-bolder mt-3 mb-0">Property1</p>
                                            <p className="fs-8 fw-lighter mt-1 mb-0">Property2 Info</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </TabContainer>
                        </Row>
                        <Row>
                            <Card className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "90%"}}>
                                <Row>
                                    <Col className="col mx-3" >
                                        <p className="fs-8 fw-bolder mt-3 mb-0">Property2</p>
                                        <p className="fs-8 fw-lighter mt-1 mb-0">Property3 Info</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                        <Row>
                            <Card className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "90%"}}>
                                <Row>
                                    <Col className="col mx-3" >
                                        <p className="fs-8 fw-bolder mt-3 mb-0">Property3</p>
                                        <p className="fs-8 fw-lighter mt-1 mb-0">Property3 Info</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </Col>
                </Row>

            </Container>
        );
    }

}