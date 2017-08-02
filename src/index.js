import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import App from './components/App/App';
import * as reducers from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(
    combineReducers(reducers),
    undefined,
    compose(
        applyMiddleware(thunk, logger),
        autoRehydrate()
    )
);

ReactDOM.render(
    <Provider {...{store}}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
persistStore(store);
