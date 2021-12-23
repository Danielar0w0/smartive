import React from "react";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export class AvailableTypesList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            availableTypes: [
                {name: "Temperature Sensor", value: "TEMPERATURE"},
                {name: "Humidity Sensor", value: "HUMIDITY"}
            ]
        };

    }

    render() {

        let availableTypesItems = [];
        let elementUUIDCounter = 0;

        for (let elementIdx in this.state.availableTypes) {
            availableTypesItems.push(
                <Row className="my-3" key={elementUUIDCounter}>
                    <input type="radio" className="btn-check" name="options" id={"option" + elementUUIDCounter} value={this.state.availableTypes[elementIdx].value} autoComplete="off" onClick={() => this.props.on_select(document.querySelector('input[name="options"]:checked').value)}/>
                    <label className="btn text-start p-3 text-secondary fw-light fs-7 boxShadow" htmlFor={"option" + elementUUIDCounter}>{this.state.availableTypes[elementIdx].name}</label>
                </Row>
            );
            elementUUIDCounter++;
        }

        return (

            <Container className="mt-4">
                {availableTypesItems}
            </Container>

        );

    }

}