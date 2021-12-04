import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export class BigPanel extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isActive: false,
        };

    }

    render() {

        return (

            <Card className='m-3 mx-0 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                <Container className="my-3">
                    <Row>
                        <p className="fs-6 fw-bold">Expenses</p>
                    </Row>
                    <Row>
                        <span style={{height: "43vh", width: "100%", display: "block"}}/>
                    </Row>
                </Container>

            </Card>
        );

    }

}