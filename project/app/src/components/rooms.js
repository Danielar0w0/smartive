import React from 'react';

import { Navbar } from "./base_components/navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import {RoomPanelsList} from "./base_components/room_panels_list";
import {RestAPIHandler} from "../utils/RestAPIHandler";
import store from "../store";
import {fetchRooms} from "../features/rooms/roomsReducer";
import {Link} from "react-router-dom";
import {UserPanelsList} from "./base_components/userPanelsList";

export class Rooms extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            selectedRoom: undefined,
            rooms: []
        }
    }

    roomChangedHandler(room) {

        store.dispatch(fetchRooms);

        store.subscribe(() => {

            let allRooms = store.getState().roomsFeature.rooms;
            for (let roomIdx in allRooms) {
                let otherRoom = allRooms[roomIdx];
                if (room.roomId === otherRoom.roomId) {
                    this.setState({
                        selectedRoom: room.roomId,
                        users: room.users
                    });
                }
            }
        })
    }

    render() {

        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <RoomPanelsList on_room_changed={this.roomChangedHandler.bind(this)} />

                <Row className="my-5">
                    <Col className="col-3 mt-0">
                        <Link to="/add_user">
                            <Button className="py-3 rounded btn w-100"
                                    style={{backgroundColor: "white", borderColor: "#f76540", borderWidth: "2px"}}>
                                <span style={{color: "#f76540"}}>Add User</span></Button>
                        </Link>
                    </Col>
                </Row>

                <UserPanelsList users={this.state.users}></UserPanelsList>

            </Container>
        );
    }

}