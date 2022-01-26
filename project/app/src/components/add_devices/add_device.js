import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Navbar} from "../base_components/navbar";
import {ProgressBar} from "react-bootstrap";
import {DeviceName} from "./device_name";
import {ConfigurationStep} from "./configuration_step";
import {RoomItemsList} from "../base_components/room_items_list";
import {AvailableDevicesList} from "../base_components/available_devices_list";
import {AvailableTypesList} from "../base_components/available_types_list";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import $ from 'jquery';

export class AddDevice extends React.Component {

    constructor(props) {

        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            currentStep: 0,
            currentDevice: {},
            successfullyRegistered: false
        };

    }

    renderConfigStep(configStepIdx) {

        switch (configStepIdx) {
            case 0:
                return (<DeviceName on_next_click={this.setDeviceName.bind(this)} />);
            case 1:
                return (<ConfigurationStep title={"Select a device from nearby devices:"} childComponent={<AvailableDevicesList on_select={this.setDeviceId.bind(this)}/>} btn_text={"Next"} on_next_click={this.handleChildNextClick.bind(this)} />)
            case 2:
                return (<ConfigurationStep title={"Select the device category:"} childComponent={<AvailableTypesList on_select={this.setDeviceType.bind(this)}/>} btn_text={"Next"} on_next_click={this.handleChildNextClick.bind(this)} />)
            case 3:
                return (<ConfigurationStep title={"Select Room:"} childComponent={<RoomItemsList on_select={this.setDeviceRoom.bind(this)} />} btn_text={"Finish"} on_next_click={this.registerDevice.bind(this)} />)
            case 4:
                if (this.state.successfullyRegistered)
                    return (<ConfigurationStep title={"Successfully registered new device."} btn_text={"Go Back"} on_next_click={this.goBack.bind(this)} />)
                else
                    return (<ConfigurationStep title={"Unable to register your device."} btn_text={"Go Back"} on_next_click={this.goBack.bind(this)} />)
        }

    }

    setDeviceName(deviceName) {

        let currentState = this.state;
        currentState.currentDevice['name'] = deviceName;
        this.setState(currentState);

        this.handleChildNextClick();

    }

    setDeviceType(deviceType) {

        let currentState = this.state;
        currentState.currentDevice['category'] = deviceType;
        this.setState(currentState);

        this.enableNextButton();

    }

    setDeviceId(deviceId) {

        let currentState = this.state;
        currentState.currentDevice['deviceId'] = deviceId;
        this.setState(currentState);

        this.enableNextButton();

    }

    setDeviceRoom(deviceRoom) {

        let currentState = this.state;
        currentState.currentDevice['roomId'] = deviceRoom;
        this.setState(currentState);

        console.log(this.state.currentDevice);

        this.enableNextButton();

    }

    registerDevice() {

        this.apiHandler.deleteAvailableDevice(this.state.currentDevice)
            .then(deviceRemovedResult => {

                if (deviceRemovedResult) {

                    this.apiHandler.registerNewDevice(this.state.currentDevice)
                        .then(deviceRegisteredResult => {

                            if (deviceRegisteredResult) {
                                this.setState({ successfullyRegistered: true });
                            } else {
                                this.setState({ successfullyRegistered: false });
                            }

                        });

                } else {
                    this.setState({ successfullyRegistered: false });
                }

                this.handleChildNextClick();

            });

    }

    goBack() {
        window.location.replace('/devices');
    }

    enableNextButton() {
        $('#configStepNextBtn').removeClass('disabled')
    }

    handleChildNextClick() {
        this.setState({currentStep: this.state.currentStep+1});
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
                                    <img src={process.env.PUBLIC_URL + '/Router.png'} className="my-3" style={{height: "28rem", width: "100%", display: "block"}} alt="Device"/>
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