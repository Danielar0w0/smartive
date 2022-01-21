import React from "react";
import {Navbar} from "../base_components/navbar";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export class Triggers extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {}

    }

    componentDidMount() {
        this._isMounted = true;
        this.refreshData();

        setInterval(() => {
            this.refreshData();
        }, 5000);

    }

    refreshData() {
        this.apiHandler.getAllEvents()
            .then(eventsList => {
                this.setState({events: eventsList});
            });
    }

    render() {

        let items = [];
        let event = null;

        for (let e in this.state.events) {

            event = this.state.events[e]
            console.log(event)

            items.push(
                <Card className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "90%"}}>
                    <Row className="my-2">
                        <Col className="col-md col-lg mx-4" >
                            <p className="fs-8 fw-bolder mt-3 mb-0">Sensor ID</p>
                            <p className="fs-8 fw-bolder mb-2">Target ID</p>
                            <p className="fs-7 fw-light text-secondary mb-0">Event</p>
                            <p className="fs-7 fw-light text-secondary">Trigger Type</p>
                            <p className="fs-7 fw-light text-secondary mb-3">Trigger Value</p>
                        </Col>
                        <Col className="col-md col-lg mx-4 text-end" >
                            <p className="fs-8 fw-bolder mt-3 mb-0">{event.sensorId}</p>
                            <p className="fs-8 fw-bolder mb-2">{event.targetId}</p>
                            <p className="fs-7 fw-light text-secondary mb-0">{event.event}</p>
                            <p className="fs-7 fw-light text-secondary">{event.trigger.type}</p>
                            <p className="fs-7 fw-light text-secondary mb-3">{event.trigger.value}</p>
                        </Col>
                    </Row>
                </Card>
            )
        }

        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>
                <h4 className="ms-5 my-5">All Triggers</h4>
                {items}
            </Container>
        )
    }

}
