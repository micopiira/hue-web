import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import App from "./components/App/App";
import * as reducers from "./redux/reducers";
import registerServiceWorker from "./registerServiceWorker";

const logger = createLogger({collapsed: true});

const LOCAL_STORAGE_STATE_KEY = 'reduxState';

const store = createStore(
	combineReducers(reducers),
	localStorage.getItem(LOCAL_STORAGE_STATE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY)) : {},
	compose(
		applyMiddleware(thunk, logger),
	)
);

store.subscribe(() => {
	const persistedState = (({usernames}) => ({usernames}))(store.getState());
	localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(persistedState));
});

ReactDOM.render(
	<Provider {...{store}}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();