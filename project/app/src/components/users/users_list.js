import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class UsersList extends React.Component {


    render() {

        let users = ["/user_example.jpg", "/user_example2.jpg"];
        let content = [];

        for (let i = 0; i < 4; i++) {
            if (i < users.length) {
                content.push(
                    <Col className="col-3">
                        <Image src={process.env.PUBLIC_URL + users.at(i)} className="mx-6" style={{width: "90%", height: "14vw", objectFit: "cover", borderRadius: "30px"}}/>
                        <Link to="/users/1">
                            <Button className="py-3 mt-4 rounded" style={{width: "90%", backgroundColor: "white", borderColor: "#f76540", borderWidth: "2px"}}>
                                <span style={{color: "#f76540"}}>View User</span>
                                <FontAwesomeIcon icon={faUserCircle} style={{fontSize: "115%", color: "#f76540", minWidth: "45px"}}/>
                            </Button>
                        </Link>
                    </Col>
                );
            } else {
                content.push(
                    <Col className="col-3">
                        <Image src={process.env.PUBLIC_URL + '/Default_Image.png'} className="mx-6" style={{width: "90%", height: "14vw", objectFit: "cover", borderRadius: "30px"}}/>
                        <Link to="/add_user">
                            <Button className="py-3 mt-4 rounded" style={{width: "90%", backgroundColor: "#f76540", border: "none"}}>Add User
                                <FontAwesomeIcon icon={faUserPlus} style={{fontSize: "115%", color: "white", minWidth: "45px"}}/>
                            </Button>
                        </Link>
                    </Col>
                );
            }
        }

        return(
            <Card className='m-3 my-4 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                    <Container>
                        <Row className="my-5 mx-3 justify-content-center d-flex text-center">
                            {content}
                        </Row>
                    </Container>
                </Card>
        )
    }
}
