import React from 'react';

import {RestAPIHandler} from "../../utils/RestAPIHandler";

import {Navbar} from "../base_components/navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {SensorSelect} from "./sensor_select";
import {Button, Image} from "react-bootstrap";
import {EventSelect} from "./event_select";
import {TriggerSelect} from "./trigger_select";
import store from "../../store";

export class AddTrigger extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            event: {sensorId: null, targetId: null, event: null, trigger: {type: null, value: 0}}
        }

    }

    submitEvent = () => {

        let event = this.state.event;
        let validEvent = true;

        console.log(event)
        for (let el in this.state.event) {
            if (event[el] === null || event[el] === undefined) {
                console.log("Invalid Submit.");
                validEvent = false;
            }
        }

        if (validEvent) {

            this.apiHandler.addSensorEvent(this.state.event).then(response => {

                if (response) {
                    store.dispatch({type: 'toasts/setToast', payload: {text: "Trigger successfully added"}});
                } else {
                    store.dispatch({type: 'toasts/setToast', payload: {text: "Error adding the trigger"}});
                }
                console.log(response);

            });

        }

    }

    handleChange = (childData) => {

        let newEvent = this.state.event
        if (childData.input !== "trigger") {
            newEvent[childData.input] = childData.value
            this.setState({ event: newEvent });
        } else {
            newEvent["trigger"][childData.type] = childData.value
            this.setState({ event: newEvent });
        }
    }

    render() {

        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <h4 className="ms-5 my-5">Create Trigger</h4>

                <Row>
                    <Col className="mx-3">
                        <Image src={process.env.PUBLIC_URL + '/Sensor.jpg'} className="my-3 mx-6" style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "cover",
                            borderRadius: "30px",
                            opacity: "80%"
                        }}/>
                        <p className="fs-12 fw-bolder my-3">Sensor</p>
                        <SensorSelect name="sensor" handleChange={this.handleChange}/>
                    </Col>
                    <Col className="mx-3">
                        <Image src={process.env.PUBLIC_URL + '/smart_lamp.jpg'} className="my-3 mx-6" style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "cover",
                            borderRadius: "30px",
                            opacity: "80%"
                        }}/>
                        <p className="fs-12 fw-bolder my-3">Target</p>
                        <SensorSelect name="target" handleChange={this.handleChange}/>
                    </Col>
                    <Col className="mx-3">
                        <Image src={process.env.PUBLIC_URL + '/turn_off.jpg'} className="my-3 mx-6" style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "cover",
                            borderRadius: "30px",
                            opacity: "80%"
                        }}/>
                        <p className="fs-12 fw-bolder my-3">Trigger</p>
                        <TriggerSelect handleChange={this.handleChange}/>
                    </Col>
                    <Col className="mx-3">
                        <Image src={process.env.PUBLIC_URL + '/smart_device2.jpg'} className="my-3 mx-6" style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "cover",
                            borderRadius: "30px",
                            opacity: "80%"
                        }}/>
                        <p className="fs-12 fw-bolder my-3">Event</p>
                        <EventSelect handleChange={this.handleChange}/>
                    </Col>
                </Row>
                <Row style={{marginTop: "10vh"}} className="justify-content-center d-flex">
                    <Button onClick={this.submitEvent} className="py-3 mt-4 rounded btn"
                            style={{width: "20%", backgroundColor: "#f76540", border: "none"}}>Save Trigger</Button>
                </Row>
            </Container>
        )
    }

}