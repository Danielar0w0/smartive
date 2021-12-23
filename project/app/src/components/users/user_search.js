import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Image } from 'react-bootstrap';

export class UserSearch extends React.Component {
    
    constructor(props) {    
        super(props);
    }

    render() {

        return(
            <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
    
                <Container>
                    <Row className="my-3 justify-content-center d-flex text-center">
                        <Image src={process.env.PUBLIC_URL + '/user_example2.jpg'} className="my-3 mx-6" style={{width: "16vw", height: "14vw", objectFit: "cover", borderRadius: "45px"}}/>
                        <h5 className='font-weight-bold mt-2 mb-0'>Username_X11</h5>
                        <p style={{fontStyle: "italic"}}>Hi, I'm Frank!</p>

                        <p className="mt-5" style={{fontStyle: "italic"}}>Is this the User you're looking for?</p>
                    </Row>
                </Container>

            </Card>
        );

    }
}