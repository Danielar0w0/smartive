import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Navbar} from "../navbar";
import {ProgressBar} from "react-bootstrap";
import {DeviceList} from "./device_list";
import {DeviceName} from "./device_name";

export class AddDevice extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            currentStep: 0,
        };

    }

    renderConfigStep(configStepIdx) {

        switch (configStepIdx) {
            case 0:
                return (<DeviceName on_next_click={this.handleChildNextClick.bind(this)} />);
            case 1:
                return (<DeviceList title={"Select a device from nearby devices:"} elements={ ["Samsung SmartTV", "Philips Bulb", "Xiaomi Temperature Sensor"] } btn_text={"Next"} on_next_click={this.handleChildNextClick.bind(this)} />)
            case 2:
                return (<DeviceList title={"Select the device category:"} elements={ ["Smart Bulbs", "Environment Sensors", "TVs & Monitors"] } btn_text={"Next"} on_next_click={this.handleChildNextClick.bind(this)} />)
            case 3:
                return (<DeviceList title={"Select Room:"} elements={ ["Bedroom", "Living Room", "Kitchen"] } btn_text={"Finish"} on_next_click={this.handleChildNextClick.bind(this)} />)

        }

    }

    handleChildNextClick() {
        this.setState({currentStep: this.state.currentStep+1})
    }

    render() {

        return (

            <Container>

                <Navbar/>

                <Row className="mt-5">
                    <Col className="col-4 mt-5">
                        <Card className="m-3 mx-0 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px"}}>
                            <Container className="my-3">
                                <Row>
                                    <img src={process.env.PUBLIC_URL + '/Router.png'} className="my-3" style={{height: "28rem", width: "100%", display: "block"}}/>
                                </Row>
                            </Container>
                        </Card>
                    </Col>

                    <Col className="col mt-5 pt-4">
                        <Container>
                            <ProgressBar variant={"success"} now={this.state.currentStep*25} style={{height: "25px"}} />
                            <Row className="mt-3">
                                <Col className="col-3">
                                    <h3 className="fw-bold" style={{color: "#f76540"}}>1</h3>
                                    <p className="fw-bold fs-7">Choose name</p>
                                </Col>
                                <Col className="col-3">
                                    <h3 className="fw-bold" style={{color: "#f76540"}}>2</h3>
                                    <p className="fw-bold fs-7">Select Device</p>
                                </Col>
                                <Col className="col-3">
                                    <h3 className="fw-bold" style={{color: "#f76540"}}>3</h3>
                                    <p className="fw-bold fs-7">Select Category</p>
                                </Col>
                                <Col className="col-3">
                                    <h3 className="fw-bold" style={{color: "#f76540"}}>4</h3>
                                    <p className="fw-bold fs-7">Finish</p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col className="col">
                                    {this.renderConfigStep(this.state.currentStep)}
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                </Row>

            </Container>

        );

    }

}