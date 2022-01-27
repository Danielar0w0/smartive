import React from 'react';
import Container from "react-bootstrap/Container";
import { Navbar } from "../base_components/navbar";
import {HistoryItemList} from "./history_item_list";
import {TypePanelsList} from "../base_components/type_panels_list";
import {HistoryType} from "../../utils/entities/HistoryType";

export class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            historyType: undefined,
        }
    }

    typeChangedHandler(type) {
        if (type !== undefined && type >= 0 && type <= 2)
            this.setState({ historyType: HistoryType[type] })
        else
            this.setState({ historyType: undefined })
    }

    render() {
        return (
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>

                <TypePanelsList on_type_changed={this.typeChangedHandler.bind(this)}></TypePanelsList>
                <HistoryItemList type_selected={this.state.historyType}></HistoryItemList>

            </Container>
        );
    }
}