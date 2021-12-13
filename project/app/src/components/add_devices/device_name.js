import React from 'react';

import Button from "react-bootstrap/Button";

export class DeviceName extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isActive: false,
        };

    }

    render() {

        return (

            <div>
                <h3 className="fw-bold"/>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="fw-bold mb-3">Choose a name for your device</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Device name"/>
                    <Button className="mt-5 w-25" style={{backgroundColor: "#f76540", borderColor: "#f76540"}} onClick={() => this.props.on_next_click()}>Next</Button>
                </div>

            </div>

        );

    }

}