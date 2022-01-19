import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppRouting from './routes';
import reportWebVitals from './reportWebVitals';

import {RabbitMQHandler} from "./utils/RabbitMQHandler";

import {Provider} from "react-redux";
import store from "./store";
import {fetchRooms} from "./features/rooms/roomsReducer";

let rabbitMQHandler = new RabbitMQHandler('test', 'test', 'ws://' + process.env.REACT_APP_RABBIT_MQ_ADDRESS + ':15674/ws');
rabbitMQHandler.connect();

// Fetch rooms on app start-up
store.dispatch(fetchRooms);

ReactDOM.render(
    <Provider store={store}>
        <AppRouting/>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
