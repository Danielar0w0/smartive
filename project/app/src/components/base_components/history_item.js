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
                <Row className="my-2 align-items-center d-flex">
                    <Col className="col-md-2 col-lg-2 text-center ms-2">
                        <IconButton className="my-3 p-4" style={{borderRadius: "15px", backgroundColor: "#f76540"}}>
                            <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "115%", color: "white",  minWidth: "30px"}}/>
                        </IconButton>
                    </Col>
                    <Col className="col me-5">
                        <p className="fs-8 fw-bolder mt-3 mb-0">{this.props.key}</p>
                        <p className="fs-6 fw-normal mb-2 text-break">{this.props.description}</p>
                        <p className="fs-7 fw-light text-secondary text-end">{this.props.date}</p>
                    </Col>
                </Row>
            </Card>
        );

    }
}