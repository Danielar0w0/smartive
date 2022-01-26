import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';


export class ProfilePanel extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isActive: false,
        };

    }

    render() {

        return (

            <Card className='m-3 my-2 shadow-sm px-0 boxShadow border-light' style={{borderRadius: "15px"}}>
    
                <Container>
                    <Row className="my-3 justify-content-center d-flex text-center">
                        <Image src={process.env.PUBLIC_URL + '/user_example.jpg'} className="my-3 mx-6" style={{width: "16vw", height: "14vw", objectFit: "cover", borderRadius: "45px"}}/>
                        <h5 className='font-weight-bold mt-2 mb-0'>{this.props.user_name}</h5>
                        <p style={{fontStyle: "italic"}}>{this.props.user_email}</p>
                    </Row>

                    {/*<Row className="mx-auto">
                        <Col>
                            <p style={{fontWeight: "bold"}}>Name</p>
                        </Col>
                        <Col>
                            <p style={{textAlign: "end"}}>Isabelle Mendez</p>
                        </Col>
                    </Row>
                    <Row className="mx-auto">
                        <Col>
                            <p style={{fontWeight: "bold"}}>Gender</p>
                        </Col>
                        <Col>
                            <p style={{textAlign: "end"}}>Female</p>
                        </Col>
                    </Row>
                    <Row className="mx-auto"> 
                        <Col>
                            <p style={{fontWeight: "bold"}}>Age</p>
                        </Col>
                        <Col>
                            <p style={{textAlign: "end"}}>34</p>
                        </Col>
                    </Row>
                    <Row className="mb-4 mx-auto">
                        <Col>
                            <p style={{fontWeight: "bold"}}>Joined in</p>
                        </Col>
                        <Col>
                            <p style={{textAlign: "end"}}>10/11/2020</p>
                        </Col>
                    </Row>*/}
                </Container>

            </Card>
        );
    }
}