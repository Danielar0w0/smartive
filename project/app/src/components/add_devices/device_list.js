import React from 'react';

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export class DeviceList extends React.Component {

    render() {

        let listItems = [];
        let elementUUIDCounter = 0;

        if (this.props.elements !== undefined) {
            for (let element in this.props.elements) {
                listItems.push(
                    <Row className="my-3" key={elementUUIDCounter}>
                        <input type="radio" className="btn-check" name="options" id={"option" + elementUUIDCounter} autoComplete="off"/>
                        <label className="btn text-start p-3 text-secondary fw-light fs-7 boxShadow" htmlFor={"option" + elementUUIDCounter}>{this.props.elements[element]}</label>
                    </Row>
                )
                elementUUIDCounter++
            }
        }

        return (

            <div>
                <h3 className="fw-bold"/>

                <p className="fw-bold mb-4">{this.props.title}</p>

                <Container className="mt-4">
                    {listItems}
                </Container>

                <Button className="mt-4 w-25" style={{backgroundColor: "#f76540", borderColor: "#f76540"}} onClick={() => this.props.on_next_click()}>{this.props.btn_text}</Button>

            </div>

        );

    }

}