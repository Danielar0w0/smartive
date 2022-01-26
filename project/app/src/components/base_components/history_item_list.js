import React from "react";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import store from "../../store";

export class HistoryItemList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            historyItems: {},
            // selectedType: undefined
        };

    }

    componentDidMount() {

        store.subscribe(() => {
            this.setState({
                historyItems: {} // store.getState().roomsFeature.rooms
            });
        });

    }

    render() {

    }

}