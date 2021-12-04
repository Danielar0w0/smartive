import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { Dashboard } from './components/dashboard'
import { createBrowserHistory } from "history";

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



