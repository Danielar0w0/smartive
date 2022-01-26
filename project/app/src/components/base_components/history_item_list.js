import React from "react";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import store from "../../store";
import {
    fetchHistory,
    fetchHistoryDevices,
    fetchHistoryRooms,
    fetchHistoryTriggers
} from "../../features/history/historyReducer";
import {HistoryType} from "../../utils/entities/HistoryType";
import {HistoryItem} from "./history_item";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export class HistoryItemList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isLoading: true,
            selectedHistoryType: undefined,
            historyItems: Array.of(0),
        };

    }

    componentDidMount() {

        store.dispatch(fetchHistory);

        store.subscribe(() => {
            this.setState({
                historyItems: store.getState().historyFeature.historyItems
            });
        });

    }

    updateItems() {

        let type = this.state.selectedHistoryType;
        switch (type) {

            case (0):

                store.dispatch(fetchHistoryDevices);
                store.subscribe(() => {
                    let items = store.getState().historyFeature.historyItems;
                    this.setState({
                        historyType: HistoryType[0],
                        historyItems: items
                    });
                });
                break;

            case (1):

                store.dispatch(fetchHistoryRooms);
                store.subscribe(() => {
                    let items = store.getState().historyFeature.historyItems;
                    this.setState({
                        historyType: HistoryType[1],
                        historyItems: items
                    });
                });
                break;

            case (2):

                store.dispatch(fetchHistoryTriggers);
                store.subscribe(() => {
                    let items = store.getState().historyFeature.historyItems;
                    this.setState({
                        historyType: HistoryType[2],
                        historyItems: items
                    });
                });
                break;

            default:

                store.dispatch(fetchHistory);
                store.subscribe(() => {
                    let items = store.getState().historyFeature.historyItems;
                    this.setState({
                        historyType: undefined,
                        historyItems: items
                    });
                });
        }
    }

    render() {

        this.updateItems();

        let historyItems = this.state.historyItems;
        historyItems.sort((i1, i2) => {
            if (i1.date > i2.date)
                return -1;
            if (i1.date < i2.date)
                return 1;
            return 0;
        })

        let itemPanels = [];

        for (let itemIdx in historyItems) {

            let item = historyItems[itemIdx];
            itemPanels.push(
                <HistoryItem
                    key={item.itemId}
                    icon={faHome}
                    description={item.description}
                    date={item.date}
                />
            )
        }

        return (

            <Container>
                <p className="fw-normal fs-5">History</p>
                <Row>{itemPanels}</Row>
            </Container>

        );

    }

}