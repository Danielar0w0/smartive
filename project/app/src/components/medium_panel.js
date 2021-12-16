import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";

export class MediumPanel extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isActive: false,
        };

    }

    render() {

        return (

            <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                <Container>
                    <Row className="my-3">
                        <Col className="mx-2 justify-content-center d-flex w-50">
                            <IconButton className="my-2 p-4" style={{borderRadius: "15px", backgroundColor: "#f76540"}}>
                                <FontAwesomeIcon icon={this.props.icon} style={{fontSize: "2vw", minWidth: "40px"}}/>
                            </IconButton>
                        </Col>
                        <Col className="col mx-4 w-50" >
                            <p className="fs-8 fw-bolder mt-3 mb-0">Devices</p>
                            <p className="fs-6 fw-normal mb-2">Energy</p>
                            <p className="fs-7 fw-light text-secondary">700 kWh</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <p>TV</p>
                        <p className="mb-0">Model 1</p>
                        <p>Model 2</p>
                    </Row>
                    <Row className="mb-4">
                        <p>LAMPS</p>
                        <p className="mb-0">Model 1</p>
                        <p className="mb-0">Model 2</p>
                        <p>Model 3</p>
                    </Row>
                </Container>

            </Card>
        );

    }

}