import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Navbar} from "./base_components/navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {RestAPIHandler} from "../utils/RestAPIHandler";
import store from "../store";

export class CreateRoom extends React.Component {

    constructor(props) {

        super(props);

        this.apiHandler = new RestAPIHandler();

        this.state = {
            message: undefined
        };

    }

    registerRoom(roomName) {
        
        this.apiHandler.registerRoom(roomName)
            .then(result => {
                if (result) {

                    setTimeout(() => {
                        if (window.location.pathname+window.location.search === "/create_room")
                            window.location.replace("/");
                    }, 5000);
                    store.dispatch({ type: 'toasts/setToast', payload: { text: "Added room successfully." } });

                } else {
                    store.dispatch({ type: 'toasts/setToast', payload: { text: "Error adding room." } });
                }
            });

    }

    render() {

        return (
            <Container>

                <Navbar/>

                <Row className="mt-5">
                    <Col className="col-4 mt-5">
                        <Card className="m-3 mx-0 my-2 shadow-sm px-0 boxShadow border-light" style={{borderRadius: "15px"}}>
                            <Container className="my-3">
                                <Row>
                                    <img src={process.env.PUBLIC_URL + '/smart_lamp.jpg'} className="my-3" style={{height: "28rem", width: "100%", display: "block"}} alt="Device"/>
                                </Row>
                            </Container>
                        </Card>
                    </Col>

                    <Col className="col mt-5 pt-4">
                        <Container>

                            <p className="fw-normal fs-2 mb-3">Register Room</p>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="fw-bold mb-3">Choose a name for your room</label>
                                <input type="text" className="form-control" id="roomNameInput" aria-describedby="roomName" placeholder="Room name"/>
                                <Button className="mt-5 w-25" style={{backgroundColor: "#f76540", borderColor: "#f76540"}} onClick={() => this.registerRoom(document.getElementById("roomNameInput").value)}>Create Room</Button>
                            </div>

                        </Container>
                    </Col>

                </Row>

            </Container>
        );

    }

}