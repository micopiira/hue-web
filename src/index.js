import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App/App';
import { lights } from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(combineReducers({lights}), applyMiddleware(thunk));

ReactDOM.render(
    <Provider {...{store}}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
