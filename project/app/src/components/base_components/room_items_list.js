import React from "react";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {MiniPanel} from "./mini_panel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export class RoomItemsList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            rooms: Array.of(0)
        };

    }

    componentDidMount() {

        this.refreshData();

        setInterval(() => {
            this.refreshData();
        }, 5000);

    }

    refreshData() {

        this.apiHandler.getAllRooms()
            .then(allRooms => {
                this.setState({isLoading: false, rooms: allRooms});
            });

    }


    render() {

        let roomsList = [];
        let elementUUIDCounter = 0;

        for (let elementIdx in this.state.rooms) {
            roomsList.push(
                <Row className="my-3" key={elementUUIDCounter}>
                    <input type="radio" className="btn-check" name="options" id={"option" + elementUUIDCounter} autoComplete="off"/>
                    <label className="btn text-start p-3 text-secondary fw-light fs-7 boxShadow" htmlFor={"option" + elementUUIDCounter}>{this.state.rooms[elementIdx].name}</label>
                </Row>
            );
            elementUUIDCounter++;
        }

        return (

            <Container className="mt-4">
                {roomsList}
            </Container>

        );

    }

}