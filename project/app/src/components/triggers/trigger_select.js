import React from 'react';

import {RestAPIHandler} from "../../utils/RestAPIHandler";
import Select from "react-select";
import Container from "react-bootstrap/Container";

export class TriggerSelect extends React.Component {

    constructor(props) {
        super(props);

        this.apiHandler = new RestAPIHandler();
        this.state = {
            selectedOption: null,
            triggers: [ {value: "ON_VALUE_EQUALS", label: "Equal to"},
                {value: "ON_VALUE_BIGGER_THAN", label: "Bigger than"},
                {value: "ON_VALUE_LESS_THAN", label: "Less than"},
                {value: "ON_VALUE_SIMILIAR_TO", label: "Similar to"}],
            value: 0
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption });

        this.props.handleChange({input: "trigger", type: "type", value: selectedOption.value});
    }

    onInputChange = (event) => {
        this.setState({
            value: event.target.value
        });
        this.props.handleChange({input: "trigger", type: "value", value: event.target.value});
    }

    render() {

        const selectedOption = this.state.selectedOption;
        const triggers = this.state.triggers;

        if (triggers.length === 0) {
            return ( <p>Loading...</p> )
        }

        return (
            <Container className="m-0 p-0">
                <Select value={selectedOption} options={triggers} onChange={this.handleChange} />
                <input
                    className="form-control mt-3"
                    name="value"
                    type="number"
                    value={this.state.value}
                    onChange={this.onInputChange}
                />
            </Container>
        )
    }

}