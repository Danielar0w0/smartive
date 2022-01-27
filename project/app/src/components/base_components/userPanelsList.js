import React from "react";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Item} from "./item";

export class UserPanelsList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            users: props.users,
        };

    }

    render() {

        let users = this.state.users;

        if (users === undefined) {
            return (
                <Container>
                    <p className="fw-normal fs-5 my-5">Users</p>
                    <p>No Results.</p>
                </Container>
            )
        }

        users.sort((i1, i2) => {
            if (i1.name > i2.name)
                return -1;
            if (i1.date < i2.date)
                return 1;
            return 0;
        })

        let userPanels = [];
        for (let userIdx in users) {
            let user = users[userIdx];
            userPanels.push(
                <Item
                    key={user.userId}
                    icon={faUser}
                    main={user.username}
                    secondary={user.email}
                    type={"user"}
                />
            );
        }

        if (userPanels.length === 0)
            return (
                <Container>
                    <p className="fw-normal fs-5 my-5">Users</p>
                    <p>No Results.</p>
                </Container>
            )

        return (

            <Container>
                <p className="fw-normal fs-5 my-5">Users</p>
                <Row>{userPanels}</Row>
            </Container>

        );

    }

}