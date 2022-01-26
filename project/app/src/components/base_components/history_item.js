import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export class HistoryItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>

                <Container>
                    <Row className="my-3 justify-content-center d-flex text-center">

                    </Row>
                    <Row className="my-5 justify-content-center d-flex text-center">

                    </Row>
                </Container>

            </Card>
        );

    }
}