import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Navbar } from "../base_components/navbar";

import {
    faEnvelope, faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'react-bootstrap';
import { UserSearch } from './user_search';
import { Input } from '@mui/material';

export class AddUser extends React.Component {
    
    constructor(props) {    
        super(props);
    }

    render() {

        return(
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <Row className="mt-5 justify-content-center d-flex">
                    <Col className='col-4'>
                        <UserSearch></UserSearch>
                    </Col>
                    
                    <Col className="col-3 d-flex align-items-end mb-3">  
                        <Row className="justify-content-center d-flex">
                            <h5 className='mb-4'>Search for User:</h5>
                            <Col>
                                <Input placeholder="Username" style={{width: "90%"}}></Input>  
                            </Col>
                            <Col className="col-3">
                                <Button style={{backgroundColor: "white", borderColor: "#f76540"}}>
                                    <FontAwesomeIcon icon={faSearch} style={{fontSize: "115%", color: "#f76540"}}/>
                                </Button>
                            </Col>
                            
                            <Button className="py-3 mt-4 rounded" style={{width: "90%", backgroundColor: "#f76540", border: "none"}}>Send Invite
                                <FontAwesomeIcon icon={faEnvelope} style={{fontSize: "115%", color: "white", minWidth: "45px"}}/>
                            </Button>
                        </Row> 
                    </Col>
                </Row>
            </Container>
        );
    }
}