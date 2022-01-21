import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconButton from "@mui/material/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

export class MiniPanelInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let icon = (
            <IconButton className="my-3 p-4" style={{borderRadius: "15px", backgroundColor: "#FDE0D8"}}>
                <FontAwesomeIcon icon={this.props.icon || faPlus} style={{fontSize: "115%", color: "#f76540",  minWidth: "30px"}}/>
            </IconButton>
        );

        return (
            <Card onClick={this.props.on_click} className="m-3 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px", width: "70%"}}>
                <Row className="my-2">
                    <Col className="col-md col-lg-3 offset-lg-1 text-center mx-3">
                        {icon}
                    </Col>
                    <Col className="col-md col-lg mx-4 d-flex align-items-center" >
                        <p className="fs-6 fw-normal mb-0">{this.props.title}</p>
                    </Col>
                </Row>
            </Card>
        );

    }

}