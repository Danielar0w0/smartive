import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import {MiniPanel} from "../mini_panel";


function LeftArrow() {

    const { scrollPrev } = React.useContext(VisibilityContext);

    return (
        <span onClick={() => scrollPrev()}>
            Left
        </span>
    );

}

function RightArrow() {
    const { scrollNext } = React.useContext(VisibilityContext);

    return (
        <span onClick={() => scrollNext()}>
            Right
        </span>
    );
}

export class RoomList extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            isActive: false,
        };

    }

    getItems() {
        Array(20)
            .fill(0)
            .map((_, ind) => ({ id: `element-${ind}` }))
    }

    render() {

        return (
            <ScrollMenu>
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
            </ScrollMenu>
        );

    }

}