import React from 'react';

export class Navbar extends React.Component {

    handleLogout() {
        localStorage.removeItem("user");
        window.location.replace("/");
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light rounded my-4">
                <img src={process.env.PUBLIC_URL + '/app_logo.png'} className="mt-2" style={{maxHeight: "5rem", maxWidth: "6em"}} alt="Logo"/>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09"
                        aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="d-flex collapse navbar-collapse" id="navbarsExample09">
                    <ul className="navbar-nav mx-3 fs-7 my-auto justify-content-start">
                        <li className="nav-item active mx-3">
                            <a className="nav-link fw-bolder text-black" href="/">DASHBOARD</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link fw-bolder text-black" href="/devices">YOUR DEVICES</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link fw-bolder text-black" href="/rooms">YOUR ROOMS</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link fw-bolder text-black" href="/history">HISTORY</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav fs-7 ms-auto my-auto">
                        <li className="nav-item mx-3">
                            <a className="nav-link fw-bolder" href="/profile" style={{color: "#f76540"}}>PROFILE</a>
                        </li>
                        <li className="nav-item mx-3">
                            <button className="btn nav-link fw-bolder" onClick={this.handleLogout}>LOGOUT</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );

        /*
            <li className="nav-item mx-3">
                <a className="nav-link fw-bolder text-black" href="/users">USERS</a>
            </li>
         */

    }

}