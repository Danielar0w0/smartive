import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { createBrowserHistory } from "history";
import {ControlDevice} from "./components/control_device";
import {Devices} from "./components/devices";

import { AddDevice } from "./components/add_devices/add_device";
import {Dashboard} from "./components/dashboard";
import {Profile} from "./components/profile/profile";
import { Users } from './components/users/users';
import { ViewUsers } from './components/users/view_user';
import { AddUser } from './components/users/add_user';
import { History } from './components/history';
import { Login } from "./components/login";

export default function AppRouting () {

    const customHistory = createBrowserHistory();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {

        return (
        <Router history={ customHistory }>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="*" element={<Login/>} />
            </Routes>
        </Router>
        )
    }

    return (
        <Router history={ customHistory }>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/control_device" element={<ControlDevice/>} />
                <Route path="/devices" element={<Devices/>} />
                <Route path="/add_device" element={<AddDevice/>} />
                <Route path="/" element={<Dashboard/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/users" element={<Users/>} />
                <Route path="/users/1" element={<ViewUsers/>} />
                <Route path="/add_user" element={<AddUser/>} />
                <Route path="/history" element={<History/>} />
            </Routes>
        </Router>
    )

}



