import React from 'react';

import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Select from "react-select";

export class SensorSelect extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            name: props.name,
            selectedOption: null,
            sensors: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.refreshData();

        setInterval(() => {
            this.refreshData();
        }, 5000);

    }

    refreshData() {
        this.apiHandler.getAllSensors()
            .then(sensorsList => {
                let sensors = []
                for (let sensor in sensorsList) {
                    sensors.push({value: sensorsList[sensor].deviceId, label: sensorsList[sensor].name})
                }
                this.setState({sensors: sensors});
            });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption });
        this.props.handleChange({input: this.state.name + "Id", value: selectedOption.value});
    }

    render() {

        const selectedOption = this.state.selectedOption;
        const sensors = this.state.sensors;

        if (sensors.length === 0) {
            return ( <p>Loading...</p> )
        }

        return (
            <Select value={selectedOption} options={sensors} onChange={this.handleChange} />
        )
    }

}