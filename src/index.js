import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import App from "./components/App/App";
import ErrorBoundary from "./components/ErrorBoundary";
import * as reducers from "./redux/reducers";
import * as serviceWorker from './serviceWorker';

const LOCAL_STORAGE_STATE_KEY = 'reduxState';

const store = createStore(
	combineReducers(reducers),
	localStorage.getItem(LOCAL_STORAGE_STATE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY)) : {},
	compose(
		process.env.NODE_ENV === 'development'
			? applyMiddleware(thunk, createLogger({collapsed: true}))
			: applyMiddleware(thunk),
	)
);

store.subscribe(() => {
	const persistedState = (({usernames, currentBridge}) => ({usernames, currentBridge}))(store.getState());
	localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(persistedState));
});

ReactDOM.render(
	<Provider {...{store}}>
		<ErrorBoundary>
			<App/>
		</ErrorBoundary>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.register();