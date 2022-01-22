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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from "./store";
import {CreateRoom} from "./components/create_room";
import {AddTrigger} from "./components/triggers/add_trigger";
import {Triggers} from "./components/triggers/triggers";
import { Login } from "./components/login";

export default function AppRouting () {

    const customHistory = createBrowserHistory();
    const notify = (text) => toast(text);

    store.subscribe(() => {

        const currentToast = store.getState().toastsFeature.toast;

        if (currentToast !== undefined && currentToast !== null) {
            notify(currentToast.text);
            store.dispatch({ type: 'toasts/clearToast' })
        }


    });

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {

        return (
        <Router history={ customHistory }>
            <ToastContainer />
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
                <Route path="/create_room" element={<CreateRoom/>} />
                <Route path="/add_trigger" element={<AddTrigger/>} />
                <Route path="/triggers" element={<Triggers/>} />
            </Routes>
        </Router>
    )

}



