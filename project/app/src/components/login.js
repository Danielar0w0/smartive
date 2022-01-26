import React from 'react';
import Container from "react-bootstrap/Container";
import {Form} from "./base_components/form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavbarLogin } from "./base_components/navbar_login";

const inputs = [{
    name: "username",
    placeholder: "Username",
    className: "form-control my-3",
    type: "text"
},{
    name: "password",
    placeholder: "Password",
    className: "form-control",
    type: "password"
},{
    type: "submit",
    value: "Submit",
    className: "btn my-3"
}]

const props = {name: 'loginForm', inputs: inputs}
const params = new URLSearchParams(window.location.search)

export class Login extends React.Component {

    render() {
        return (

            <Container className="container-fluid">
                <div className="mb-4">
                    <NavbarLogin/>
                </div>
                <Row className="justify-content-center align-items-center d-flex mt-5">
                    <Col className="col-3 mx-5 shadow-sm boxShadow border rounded">
                        <Row className="text-center mt-5">
                            <h3>Login</h3>
                            <span>(Add text for Sign Up option)</span>
                        </Row>
                        <Form className="p-4" {...props} error={params.get('error')} />
                    </Col>
                    <Col className="col-3 mx-5">
                        <img src={process.env.PUBLIC_URL + '/start_image.jpg'} className="rounded" style={{height: "40vh", width: "40vh", objectFit: "cover"}} />
                    </Col>
                </Row>

            </Container>
        );
    }
}
