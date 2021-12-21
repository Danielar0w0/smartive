import React from 'react';
import { RestAPIHandler } from "../../utils/RestAPIHandler";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {LargePanel} from "./large_panel";
import Container from "react-bootstrap/Container";

export class DevicesList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            sensors: []
        };

    }

    componentDidMount() {

        this.refreshData();

        setInterval(() => {
            this.refreshData();
        }, 5000);

    }

    refreshData() {

        this.apiHandler.getAllSensors()
            .then(sensorsList => {

                let clonedSensorsList = [];

                for (let sensorIdx in sensorsList) {

                    let sensor = sensorsList[sensorIdx];

                    this.apiHandler.getSensorStats(sensor.deviceId)
                        .then(sensorStats => {

                            sensor.sensorStats = sensorStats.sensorState !== undefined ? sensorStats.sensorState : {};
                            clonedSensorsList.push(sensor);

                            this.setState({ isLoading: false, sensors: clonedSensorsList});

                        });

                }

            });


    }

    render() {

        let firstColumnSensors = [], secondColumnSensors = [];
        let allSensors = this.state.sensors;

        for (let sensorIdx = 0; sensorIdx < allSensors.length; sensorIdx+=2) {

            firstColumnSensors.push(allSensors[sensorIdx]);

            if (sensorIdx+1 < allSensors.length) {
                secondColumnSensors.push(allSensors[sensorIdx+1])
            }

        }

        return (

            <Container>

                <Row>
                    <Col lg={6} md={6} sm={12}>
                        {firstColumnSensors.map(sensor => (
                            <LargePanel
                                device_name={sensor.name}
                                power_consumption={(sensor.sensorStats.value + " " + sensor.sensorStats.unit) || 'No Data'}
                            />
                        ))}
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        {secondColumnSensors.map(sensor => (
                            <LargePanel
                                device_name={sensor.name}
                                power_consumption={sensor.sensorStats.value || 'No Data'}
                            />
                        ))}
                    </Col>

                </Row>

            </Container>

        );

    }

}