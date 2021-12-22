import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Image } from 'react-bootstrap';
import { faPowerOff, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class DevicePanel extends React.Component {
    
    constructor(props) {    
        super(props);
    }

    render() {

        return(
            <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
    
                <Container>
                    <Row className="my-3 justify-content-center d-flex text-center">
                        <Image src={process.env.PUBLIC_URL + '/smart_lamp.jpg'} className="my-3 mx-6" style={{width: "16vw", height: "14vw", objectFit: "cover", borderRadius: "45px"}}/>
                        <h5 className='font-weight-bold mt-2 mb-0'>Smart Lamp</h5>
                        <p style={{fontStyle: "italic"}}>MODEL-Xx</p>
                    </Row>
                    <Row className="my-5 justify-content-center d-flex text-center">
                        <Col className="col-3">
                            <Button style={{backgroundColor: "#f76540", border: "none", width: "4vw", height: "4vw"}}><FontAwesomeIcon icon={faPowerOff} style={{fontSize: "150%"}} /></Button>
                        </Col> 
                        <Col className="col-3">
                            <Button style={{backgroundColor: "#FDE0D8", border: "none", width: "4vw", height: "4vw"}}><FontAwesomeIcon icon={faPlus} style={{color: "#f76540", fontSize: "150%"}} /></Button>
                        </Col> 
                        <Col className="col-3">
                            <Button style={{backgroundColor: "#FDE0D8", border: "none", width: "4vw", height: "4vw"}}><FontAwesomeIcon icon={faMinus} style={{color: "#f76540", fontSize: "150%"}} /></Button>
                        </Col> 
                    </Row>
                </Container>

            </Card>
        );

    }
}