import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Navbar} from "../base_components/navbar";

import {
    faEnvelope, faRedo, faSearch
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Button} from 'react-bootstrap';
import {UserSearch} from '../base_components/user_search';
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Select from "react-select";
import store from "../../store";

export class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            rooms: [],
            selectedRoom: undefined,
            username: undefined,
            user: undefined,
            found: false,
            inputValue: "",
        }
    }

    getRooms() {
        store.subscribe(() => {
            this.setState({
                rooms: store.getState().roomsFeature.rooms
            });
        });
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    updateSelectValue(evt) {
        this.setState({
            selectedRoom: evt.value
        });
    }

    componentDidMount() {
        this.getRooms()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState === this.state)
            return;
        this.getRooms();

    }

    search() {

        let inputValue = this.state.inputValue;

        this.setState({
            username: inputValue
        });

        this.apiHandler.getUser(inputValue).then(
            user => {
                if (user !== null)
                    this.setState({
                        user: user,
                        found: true
                    });
                else
                    this.setState({
                        user: undefined,
                        found: false
                    });
            }
        )
    }

    sendInvite() {

        let user = this.state.user;
        let room = this.state.selectedRoom;

        if (user === undefined || room === undefined)
            return;

        this.apiHandler.addUserToRoom(user, room)
            .then(result => {
                if (result) {

                    setTimeout(() => {
                        if (window.location.pathname + window.location.search === "/add_user")
                            window.location.replace("/");
                    }, 5000);

                } else {
                    store.dispatch({type: 'toasts/setToast', payload: {text: "Error adding user."}});
                }
            });
    }

    render() {

        let options = [];
        if (this.state.rooms.length !== 0) {
            for (let roomIdx in this.state.rooms) {
                let room = this.state.rooms[roomIdx];
                options.push({value: room.roomId, label: room.name});
            }
        }

        let select;
        if (options.length === 0)
            select = <Select isDisabled={true} placeholder="No Results."/>
        else
            select = <Select options={options} onChange={evt => this.updateSelectValue(evt)}/>

        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <Row className="mt-5 justify-content-center d-flex">
                    <Col className='col-4'>
                        <UserSearch username={this.state.username} found={this.state.found} ></UserSearch>
                    </Col>

                    <Col className="col-3 d-flex align-items-end mb-3">
                        <Row className="justify-content-center d-flex">
                            <h5 className='mt-4'>Select Room:</h5>
                            <Row className="justify-content-end d-flex mb-2">
                                <Button style={{color: "white", backgroundColor: "white", border:"none", width: "4vw"}} onClick={evt => window.location.reload()}>
                                    <FontAwesomeIcon icon={faRedo} onClick={evt => window.location.reload()}
                                                     style={{fontSize: "115%", color: "grey", minWidth: "45px"}}/>
                                </Button>
                            </Row>
                            {select}

                            <h5 className='my-4'>Search for User:</h5>
                            <Col>
                                <input className="form-control" type="text" placeholder="Username"
                                       style={{width: "90%"}}
                                       value={this.state.inputValue}
                                       onChange={evt => this.updateInputValue(evt)}></input>
                            </Col>
                            <Col className="col-3">
                                <Button style={{backgroundColor: "white", borderColor: "#f76540"}}
                                        onClick={evt => this.search()}>
                                    <FontAwesomeIcon icon={faSearch} style={{fontSize: "115%", color: "#f76540"}}/>
                                </Button>
                            </Col>

                            <Button disabled={this.state.user === undefined} className="py-3 mt-4 rounded"
                                    style={{width: "90%", backgroundColor: "#f76540", border: "none"}}>Add User
                                <FontAwesomeIcon icon={faEnvelope} onClick={evt => this.sendInvite()}
                                                 style={{fontSize: "115%", color: "white", minWidth: "45px"}}/>
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}