import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Image } from 'react-bootstrap';

export class UserSearch extends React.Component {

    render() {

        if (!(this.props.username)) {
            return(
                <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
                    <Container>
                        <Row className="my-3 justify-content-center d-flex text-center">
                            <Image src={process.env.PUBLIC_URL + '/user_default.png'} className="mt-3 mb-5 mx-6" style={{width: "16vw", height: "14vw", objectFit: "cover", borderRadius: "45px"}}/>
                            <h5 className='font-weight-bold mt-5 mb-2'>NO USER</h5>
                            <p className='mb-4' style={{fontStyle: "italic"}}>Start searching...</p>
                        </Row>
                    </Container>

                </Card>
            );
        }

        return(
            <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
    
                <Container>
                    <Row className="my-3 justify-content-center d-flex text-center">
                        <Image src={this.props.found ? process.env.PUBLIC_URL + '/user_found.png' : process.env.PUBLIC_URL + '/user_default.png'} className="mt-3 mb-5 mx-6" style={{width: "16vw", height: "14vw", objectFit: "cover", borderRadius: "45px"}}/>
                        <h5 className='font-weight-bold mt-5 mb-2'>{this.props.username}</h5>
                        <p className='mb-4' style={{fontStyle: "italic"}}>{this.props.found ? "Is this the User you're looking for?": "User not found."}</p>
                    </Row>
                </Container>

            </Card>
        );

    }
}