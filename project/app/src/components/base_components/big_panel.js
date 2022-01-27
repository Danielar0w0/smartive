import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import store from "../../store";

export class BigPanel extends React.Component {

    constructor(props) {

        super(props);

        this.apiHandler = new RestAPIHandler();

        this.state = {
            isActive: false,
        };

    }

    componentDidMount() {

        let devicesOverview = [];

        store.subscribe(() => {

            if (this.props.devices) {

                devicesOverview = [];

                this.props.devices.forEach(device => {

                    this.apiHandler.getHistoryAggregation(device.deviceId)
                        .then(historyAggregationResult => {

                            devicesOverview.push(
                                <div className="row">
                                    <div className="col">
                                        <p className="fs-8 fw-light text-center">{device.name}</p>
                                    </div>
                                    <div className="col">
                                        <p className="fs-8 fw-light text-center">{historyAggregationResult.combinedPowerConsumption.toFixed(3)} kWh</p>
                                    </div>
                                    <div className="col">
                                        <p className="fs-8 fw-light text-center">{historyAggregationResult.averageValue.toFixed(3)} </p>
                                    </div>
                                </div>
                            );

                        })
                        .then(() => {
                            this.setState({
                                devicesPanels: devicesOverview
                            });
                        });

                });

            }

        })

    }

    render() {

        return (

            <Card className='m-3 mx-0 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                <Container className="my-3">
                    <Row>
                        <p className="fs-6 fw-bold">{this.props.title}</p>
                        <p className="fs-7 fw-normal">{this.props.subtitle}</p>
                        <div className="row mt-3">
                            <div className="col">
                                <p className="fs-8 fw-bold text-center">{this.props.columns[0]}</p>
                            </div>
                            <div className="col">
                                <p className="fs-8 fw-bold text-center">{this.props.columns[1]}</p>
                            </div>
                            <div className="col">
                                <p className="fs-8 fw-bold text-center">{this.props.columns[2]}</p>
                            </div>
                        </div>
                    </Row>
                    <Row className="text-center fw-light">
                        {this.state.devicesPanels}
                    </Row>
                </Container>

            </Card>
        );

    }

}