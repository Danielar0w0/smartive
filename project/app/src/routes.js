import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { createBrowserHistory } from "history";
import {ControlDevice} from "./components/control_device";

export default function AppRouting () {

    const customHistory = createBrowserHistory();

    return (
        <Router history={ customHistory }>
            <Routes>
                {/*<Route path="/dashboard" element={<Dashboard/>} />*/}
                {<Route path="/control_device" element={<ControlDevice/>} />}
            </Routes>
        </Router>
    )

}



