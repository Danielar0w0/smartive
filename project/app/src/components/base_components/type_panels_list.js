import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { MiniPanel } from "./mini_panel";
import React from 'react';
import { RestAPIHandler } from "../../utils/RestAPIHandler";

export class TypePanelsList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            selectedType: undefined
        };

    }

    typePanelClicked(type) {
        this.setState({ selectedType: type });
        if (this.props.on_type_changed !== undefined)
            this.props.on_type_changed(type);
    }

    render() {

        return (
            <ScrollMenu>
                <MiniPanel
                    title={"Devices"}
                    subtitle={"History"}
                    info={"Actions with devices"}
                    on_click={this.typePanelClicked.bind(this, 0)}
                    selected={true}
                />
                <MiniPanel
                    title={"Rooms"}
                    subtitle={"History"}
                    info={"Actions with rooms"}
                    on_click={this.typePanelClicked.bind(this, 1)}
                    selected={true}
                />
                <MiniPanel
                    title={"Trigger"}
                    subtitle={"History"}
                    info={"Actions with triggers"}
                    on_click={this.typePanelClicked.bind(this, 2)}
                    selected={true}
                />
            </ScrollMenu>
        );

    }

}