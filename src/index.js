import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import App from "./components/App/App";
import * as reducers from "./redux/reducers";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const logger = createLogger({collapsed: true});

const store = createStore(
    combineReducers(reducers),
    undefined,
    compose(
        applyMiddleware(thunk, logger),
    )
);

ReactDOM.render(
    <Provider {...{store}}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();