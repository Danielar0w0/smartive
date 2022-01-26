import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconButton from "@mui/material/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";

export class HistoryItem extends React.Component {

    render() {

        return (
            <Card className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "90%"}}>
                <Row className="my-2">
                    <Col className="col-md-4 col-lg-3 offset-lg-1 text-center mx-3">
                        <IconButton className="my-3 p-4" style={{borderRadius: "15px", backgroundColor: "#f76540"}}>
                            <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "115%", color: "white",  minWidth: "30px"}}/>
                        </IconButton>;
                    </Col>
                    <Col className="col-md-6 col-lg-5 mx-4">
                        <p className="fs-8 fw-bolder mt-3 mb-0">{this.props.key}</p>
                        <p className="fs-6 fw-normal mb-2">{this.props.description}</p>
                        <p className="fs-7 fw-light text-secondary">{this.props.date}</p>
                    </Col>
                </Row>
            </Card>
        );

    }
}