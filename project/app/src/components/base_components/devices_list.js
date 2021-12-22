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
            sensors: [],
            childComponents: {}
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

                            sensor.sensorStats = sensorStats !== null && sensorStats.sensorState !== undefined ? sensorStats.sensorState : {};
                            clonedSensorsList.push(sensor);

                            let currentState = this.state;
                            currentState.sensors = clonedSensorsList;
                            this.setState(currentState);

                        });

                }

            });

        this.updateChildComponents();

    }

    updateChildComponents() {

        let allSensors = this.state.sensors;
        let componentState = this.state;

        let childComponents = {
            firstCol: [],
            secondCol: []
        };

        allSensors = allSensors.sort((s1, s2) => {
            if ( s1.name < s2.name ){
                return -1;
            }
            if ( s1.name > s2.name ){
                return 1;
            }
            return 0;
        })

        for (let sensorIdx = 0; sensorIdx < allSensors.length; sensorIdx+=2) {

            let currentSensor = allSensors[sensorIdx];
            let nextSensor = allSensors[sensorIdx+1];

            childComponents.firstCol.push(
                <LargePanel
                    key={currentSensor.deviceId}
                    device_name={currentSensor.name}
                    power_consumption={(currentSensor.sensorStats.value + currentSensor.sensorStats.unit) || 'No Data'}
                />
            );

            if (sensorIdx+1 < allSensors.length) {
                childComponents.secondCol.push(
                    <LargePanel
                        key={nextSensor.deviceId}
                        device_name={nextSensor.name}
                        power_consumption={(nextSensor.sensorStats.value + nextSensor.sensorStats.unit) || 'No Data'}
                    />
                );
            }

        }

        componentState.childComponents = childComponents;

        this.setState(componentState);

    }

    render() {

        let firstColElements = this.state.childComponents.firstCol;
        let secondColElements = this.state.childComponents.secondCol;

        return (

            <Container>

                {this.state.childComponents.firstCol === undefined || this.state.childComponents.firstCol.length === 0 || this.state.childComponents.secondCol === undefined || this.state.childComponents.secondCol.length === 0 ? 'Loading...': undefined}

                <Row>
                    <Col lg={6} md={6} sm={12}>
                        {firstColElements}
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        {secondColElements}
                    </Col>

                </Row>

            </Container>

        );

    }

}