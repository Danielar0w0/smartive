import React from 'react';
import Container from "react-bootstrap/Container";
import { Navbar } from "./base_components/navbar";

export class History extends React.Component {

    render() {
        return (
            
            <Container className="container-fluid">
                <div className="mb-4">
                    <Navbar/>
                </div>
            </Container>
        );
    }
}