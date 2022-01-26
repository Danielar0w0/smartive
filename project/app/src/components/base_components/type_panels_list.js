import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { MiniPanel } from "./mini_panel";
import React from 'react';
import {faArrowRight, faTv} from "@fortawesome/free-solid-svg-icons";

export class TypePanelsList extends React.Component {

    constructor(props) {

        super(props);
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
                    key={0}
                    icon={faTv}
                    title={"History"}
                    subtitle={"Devices"}
                    info={"Actions with devices"}
                    on_click={this.typePanelClicked.bind(this, 0)}
                    selected={this.state.selectedType === 0}
                    isCloseable={false}
                />
                <MiniPanel
                    key={1}
                    title={"History"}
                    subtitle={"Rooms"}
                    info={"Actions with rooms"}
                    on_click={this.typePanelClicked.bind(this, 1)}
                    selected={this.state.selectedType === 1}
                    isCloseable={false}
                />
                <MiniPanel
                    key={2}
                    icon={faArrowRight}
                    title={"History"}
                    subtitle={"Trigger"}
                    info={"Actions with triggers"}
                    on_click={this.typePanelClicked.bind(this, 2)}
                    selected={this.state.selectedType === 2}
                    isCloseable={false}
                />
            </ScrollMenu>
        );

    }

}