import React from "react";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export class AvailableDevicesList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            availableDevices: Array.of(0)
        };

    }

    componentDidMount() {

        this.refreshData();

        setInterval(() => {
            this.refreshData();
        }, 5000);

    }

    refreshData() {

        this.apiHandler.getAvailableDevices()
            .then(availableDevices => {
                this.setState({isLoading: false, availableDevices: availableDevices});
            });

    }

    render() {

        let availableDevicesItems = [];
        let elementUUIDCounter = 0;

        for (let elementIdx in this.state.availableDevices) {
            availableDevicesItems.push(
                <Row className="my-3" key={elementUUIDCounter}>
                    <input type="radio" className="btn-check" name="options" id={"option" + elementUUIDCounter} value={this.state.availableDevices[elementIdx].deviceId} autoComplete="off" onClick={() => this.props.on_select(document.querySelector('input[name="options"]:checked').value)}/>
                    <label className="btn text-start p-3 text-secondary fw-light fs-7 boxShadow" htmlFor={"option" + elementUUIDCounter}>{this.state.availableDevices[elementIdx].name}</label>
                </Row>
            );
            elementUUIDCounter++;
        }

        return (

            <Container className="mt-4">
                {availableDevicesItems}
            </Container>

        );

    }

}