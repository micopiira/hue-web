import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './components/App/App';
import { lights } from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const store = createStore(combineReducers({lights}));

ReactDOM.render(
    <Provider {...{store}}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
