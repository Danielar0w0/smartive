import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FaEye} from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import {FaPowerOff} from 'react-icons/fa';
import Container from "react-bootstrap/Container";
import { margin } from '@mui/system';

export class LargePanel extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isActive: false,
        };

    }

    render() {

        let iconStyle={marginLeft:"20px"}
        return (

            <Card className='m-3 mx-0 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                <Container className="my-3">
                    <Row>
                        <Col>
                            <p className="fs-6 fw-bold">{this.props.device_name}</p>
                            <p className="fs-7 fw-light text-secondary">{this.props.power_consumption}</p>
                        </Col>
                        <Col style={{display: 'flex', justifyContent: 'right'}}>
                            <IconButton>
                                <FaEye size={40} color='red'/>
                            </IconButton>
                            <IconButton style={iconStyle}>
                                <FaPowerOff size={40} color='red'/>
                            </IconButton>
                        </Col>
                    </Row>
                </Container>

            </Card>
        );

    }

}