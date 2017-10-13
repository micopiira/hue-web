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

const store = createStore(
	combineReducers(reducers),
	localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {},
	compose(
		applyMiddleware(thunk, logger),
	)
);

store.subscribe(() => {
	const persistedState = (({usernames}) => ({usernames}))(store.getState());
	localStorage.setItem('reduxState', JSON.stringify(persistedState));
});

ReactDOM.render(
	<Provider {...{store}}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();