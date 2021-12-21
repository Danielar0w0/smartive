import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import { faHome } from '@fortawesome/free-solid-svg-icons';

export class MediumPanel extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isActive: false,
        };

    }

    render() {

        const coloredIcon = this.props.coloredIcon ? true : false;
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

            <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                <Container>
                    <Row className="my-3">
                        <Col className="mx-2 justify-content-center d-flex w-50">
                            {icon}
                        </Col>
                        <Col className="col mx-4 w-50" >
                            <p className="fs-8 fw-bolder mt-3 mb-0">{this.props.title}</p>
                            <p className="fs-6 fw-normal mb-2">{this.props.subtitle}</p>
                            <p className="fs-7 fw-light text-secondary">{this.props.info}</p>
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