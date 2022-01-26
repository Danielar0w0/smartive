import React from 'react';
import Container from "react-bootstrap/Container";
import { Navbar } from "./base_components/navbar";
import store from "../store";
import {fetchDeviceHistory} from "../features/devices/devicesReducer";

export class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: undefined,
            selectCategoryHistory: {}
        }
    }

    componentDidMount() {

        // store.dispatch(fetchEvents);

        store.subscribe(() => {
            this.setState({
                selectedCategoryHistory: {}
            });
        });

    }

    deviceChangedHandler(device) {

        store.dispatch(fetchDeviceHistory(device.deviceId));

        store.subscribe(() => {

            let allDevices = store.getState().devicesFeature.devices;

        });

    }

    render() {
        return (
            
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>
            </Container>
        );
    }
}