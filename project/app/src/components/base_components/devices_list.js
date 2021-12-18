import React from 'react';
import { RestAPIHandler } from "../../utils/RestAPIHandler";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {LargePanel} from "./large_panel";
import {MiniPanel} from "./mini_panel";
import Container from "react-bootstrap/Container";

export class DevicesList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            sensors: Array.of(0)
        };

    }

    componentDidMount() {

        setInterval(() => {
            this.apiHandler.getAllSensors()
                .then(sensorsList => {

                    for (let sensorIdx in sensorsList) {
                        let sensor = sensorsList[sensorIdx];
                        this.apiHandler.getSensorStats(sensor.deviceId)
                            .then(sensorStats => {
                                console.log(sensorStats)
                                sensor.sensorStats = sensorStats;
                            });
                    }

                    this.setState({isLoading: false, sensors: sensorsList})

                });
        }, 5000);

    }

    render() {

        return (

            <Container>

                {this.state.sensors.map(device => (
                    <MiniPanel
                        room_name={device.name}
                        power_consumption={device.sensorStats !== null && device.sensorStats !== undefined ? device.sensorStats.value : '0 kWh'}
                    />
                ))}

                <Row className="mt-5">
                    <Col>
                        <LargePanel
                            device_name={'Philips Smart Bulb'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col>
                        <LargePanel
                            device_name={'Philips Smart Bulb (2)'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LargePanel
                            device_name={'Samsung Smart TV'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col>
                        <LargePanel
                            device_name={'Xiaomi Humidity Sensor'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LargePanel
                            device_name={'Xiaomi Temperature Sensor'}
                            power_consumption={'80 kWh'}
                        />
                    </Col>

                    <Col>
                        <LargePanel
                            device_name={'Xiaomi Smart IP Camera'}
                            power_consumption={'90 kWh'}
                        />
                    </Col>
                </Row>
            </Container>

        );

    }

}