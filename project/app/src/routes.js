import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { createBrowserHistory } from "history";
import {Devices} from "./components/devices";

import { AddDevice } from "./components/add_devices/add_device";
import {Dashboard} from "./components/dashboard";

export default function AppRouting () {

    const customHistory = createBrowserHistory();

    return (
        <Router history={ customHistory }>
            <Routes>
                {<Route path="/devices" element={<Devices/>} />}
                <Route path="/add_device" element={<AddDevice/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </Router>
    )

}



