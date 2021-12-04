import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

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
                <Container className="my-3">
                    <Row>
                        <Col className="col-3">
                            <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{maxHeight: "4rem", maxWidth: "4rem"}} alt="Logo"/>
                        </Col>
                        <Col className="col mx-3" >
                            <p className="fs-8 fw-bolder mt-0 mb-0">Devices</p>
                            <p className="fs-5 fw-normal mb-1 mt-0">Energy</p>
                            <p className="fs-6 fw-light text-secondary">700 kWh</p>
                        </Col>
                    </Row>
                    <Row>
                        <p>TV</p>
                        <p className="mb-0">Model 1</p>
                        <p>Model 2</p>
                    </Row>
                    <Row>
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