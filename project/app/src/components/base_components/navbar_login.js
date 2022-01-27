import React from 'react';

export class NavbarLogin extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light rounded my-4">
                <img src={process.env.PUBLIC_URL + '/app_logo.png'} className="mt-2" style={{maxHeight: "5rem", maxWidth: "6em"}} alt="Logo"/>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09"
                        aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="d-flex collapse navbar-collapse" id="navbarsExample09">
                    <ul className="navbar-nav fs-7 ms-auto my-auto">
                        <li className="nav-item mx-3">
                            <a className="nav-link fw-bolder" href="/login" style={{color: "#f76540"}}>LOGIN</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link fw-bolder" href="/register">SIGN UP</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );

    }

}