import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';

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

            <Card className={this.state.isActive ? '' + normalClasses : normalClasses} style={{borderRadius: "15px", width: "90%"}} onClick={this.handleClick.bind(this)}>
                <Row className="my-2">
                    <Col className="mx-2 justify-content-center d-flex w-50">
                        <IconButton className="my-2 p-4" style={{borderRadius: "15px", backgroundColor: "#f76540"}}>
                            <FontAwesomeIcon icon={this.props.icon} style={{fontSize: "2vw", minWidth: "40px"}}/>
                        </IconButton>
                    </Col>
                    <Col className="col mx-4 w-50" >
                        <p className="fs-8 fw-bolder mt-3 mb-0">Room</p>
                        <p className="fs-6 fw-normal mb-2">{this.props.room_name}</p>
                        <p className="fs-7 fw-light text-secondary">{this.props.power_consumption}</p>
                    </Col>
                </Row>
            </Card>
        );

    }

}