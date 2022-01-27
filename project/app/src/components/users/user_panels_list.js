import React from "react";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Item} from "../base_components/item";

export class UserPanelsList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            users: [],
            userItems: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevState !== this.state) return;

        let users = this.props.users;
        let userPanels = this.updateChildComponents(users);

        this.setState({
            users: users,
            userItems: userPanels
        })
    }

    updateChildComponents(users) {

        users.sort((i1, i2) => {
            if (i1.name > i2.name)
                return -1;
            if (i1.date < i2.date)
                return 1;
            return 0;
        })

        let userPanels = [];

        if (users === undefined || users.length === 0) {
            userPanels.push(
                <p>No Results.</p>
            )
        } else {
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
        }

        return userPanels;
    }

    render() {
        return (

            <Container>
                <p className="fw-normal fs-5 my-5">Users</p>
                <Row>{this.state.userItems}</Row>
            </Container>

        );
    }

}