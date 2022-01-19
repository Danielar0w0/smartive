import React from 'react';

import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Select from "react-select";

export class EventSelect extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            selectedOption: null,
            actions: [
                {value: "TURN_ON", label: "Turn On"},
                {value: "TURN_OFF", label: "Turn Off"},
                {value: "CHANGE_STATE", label: "Change State"},
            ]
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption });
        this.props.handleChange({input: "event", value: selectedOption.value});
    }

    render() {

        const selectedOption = this.state.selectedOption;
        const actions = this.state.actions;

        if (actions.length === 0) {
            return ( <p>Loading...</p> )
        }

        return (
            <Select value={selectedOption} options={actions} onChange={this.handleChange} />
        )
    }

}