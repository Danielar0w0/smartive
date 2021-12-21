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
    }

    render() {

        const selected = this.props.selected !== undefined;

        if (selected) {

            return (

                <Card className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "90%", backgroundColor: "#f76540"}}>
                    <Row className="my-2">
                        <Col className="col-md col-lg-3 offset-lg-1 text-center mx-3">
                            <IconButton className="my-3 p-4" style={{borderRadius: "15px", backgroundColor: "white"}}>                 
                                <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "115%", color: "#f76540",  minWidth: "30px"}}/>
                            </IconButton>
                        </Col>
                        <Col className="col-md col-lg mx-4" >
                            <p className="fs-8 fw-bolder mt-3 mb-0 text-white">{this.props.title}</p>
                            <p className="fs-6 fw-normal mb-2 text-white">{this.props.subtitle}</p>
                            <p className="fs-7 fw-light text-secondary text-white">{this.props.info}</p>
                        </Col>
                    </Row>
                </Card>

            );

        }

        const coloredIcon = this.props.coloredIcon !== undefined;
        let icon; 

        if (coloredIcon) {
            icon =
            <IconButton className="my-3 p-4" style={{borderRadius: "15px", backgroundColor: "#f76540"}}>                 
                <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "115%", color: "white",  minWidth: "30px"}}/>
            </IconButton>;
        } else {
            icon =
            <IconButton className="my-3 p-4" style={{borderRadius: "15px", backgroundColor: "#FDE0D8"}}>                 
                <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "115%", color: "#f76540",  minWidth: "30px"}}/>
            </IconButton>;
        }
        
        return (

            <Card className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "90%"}}>
                <Row className="my-2">
                    <Col className="col-md col-lg-3 offset-lg-1 text-center mx-3">
                        {icon}
                    </Col>
                    <Col className="col-md col-lg mx-4" >
                        <p className="fs-8 fw-bolder mt-3 mb-0">{this.props.title}</p>
                        <p className="fs-6 fw-normal mb-2">{this.props.subtitle}</p>
                        <p className="fs-7 fw-light text-secondary">{this.props.info}</p>
                    </Col>
                </Row>
            </Card>
        );

    }

}
