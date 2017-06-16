import React, {Component} from 'react';
import './App.css';
import Hue, {HueApi} from 'node-hue-api';
import update from 'immutability-helper';
import List from './List';
import {throttle} from 'throttle-debounce';

class App extends Component {

    hue = new HueApi();

    state = {
        lights: []
    };

    constructor(props) {
        super(props);
        this.refreshLights = this.refreshLights.bind(this);
        this.setLightState = this.setLightState.bind(this);
        this._setLightState = throttle(100, this._setLightState.bind(this));
    }

    setLightState(key, state) {
        this.setState(
            update(this.state, {lights: {[key]: {state: {$merge: state}}}}),
            () => this._setLightState(key, state)
        );
    }

    _setLightState(key, state) {
        this.hue.setLightState(this.state.lights[key].id, state).catch(alert);
    }

    componentDidMount() {
        Hue.nupnpSearch().then(bridges => {
            const host = bridges[0].ipaddress;
            const user = localStorage.getItem('hue-user');
            return user ? {host, user} : this.hue.createUser(host).then(user => ({host, user}));
        }).then(({host, user}) => {
            this.hue = new HueApi(host, user);
            this.refreshLights();
            this.interval = setInterval(this.refreshLights, 10000);
        }).catch(alert);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshLights() {
        this.hue.lights().then(({lights}) => this.setState({lights})).catch(alert);
    }

    render() {
        return (
            <div className="App">
                <List lights={this.state.lights} setLightState={this.setLightState}/>
            </div>
        );
    }
}

export default App;
