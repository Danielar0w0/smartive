import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";

export class MiniPanel extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isActive: false,
        };
    }

    handleClick() {
        const currentState = this.state.isActive;
        this.setState({ isActive: !currentState });
    }

    render() {

        let normalClasses = "m-3 my-2 shadow-sm px-0 boxShadow border-light";

        return (

            <Card className={this.state.isActive ? '' + normalClasses : normalClasses} style={{borderRadius: "15px", width: "16vw"}} onClick={this.handleClick.bind(this)}>
                <Row className="my-2">
                    <Col className="col-md col-lg-3 offset-lg-1 text-center">
                        <IconButton className="my-3 p-4" style={{borderRadius: "15px", backgroundColor: "#f76540"}}>
                            <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "115%", color: "white"}}/>
                        </IconButton>
                    </Col>
                    <Col className="col-md col-lg mx-4" >
                        <p className="fs-8 fw-bolder mt-3 mb-0">Room</p>
                        <p className="fs-6 fw-normal mb-2">{this.props.room_name}</p>
                        <p className="fs-7 fw-light text-secondary">{this.props.power_consumption}</p>
                    </Col>
                </Row>
            </Card>
        );

    }

}