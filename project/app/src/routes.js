import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { createBrowserHistory } from "history";
import {Dashboard} from "./components/dashboard";

export default function AppRouting () {

    const customHistory = createBrowserHistory();

    return (
        <Router history={ customHistory }>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </Router>
    )

}



