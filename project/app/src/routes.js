import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { createBrowserHistory } from "history";
import {Devices} from "./components/devices";

export default function AppRouting () {

    const customHistory = createBrowserHistory();

    return (
        <Router history={ customHistory }>
            <Routes>
                {<Route path="/devices" element={<Devices/>} />}
            </Routes>
        </Router>
    )

}



