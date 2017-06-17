import React, {Component} from 'react';
import './App.css';
import Hue from 'philips-hue';
import update from 'immutability-helper';
import List from './List';
import {throttle} from 'throttle-debounce';

class App extends Component {

    hue = new Hue();

    state = {
        lights: {}
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

    _setLightState(id, state) {
        this.hue.light(id).setState(state).catch(console.error);
    }

    componentDidMount() {
        this.hue.getBridges()
            .then(bridges => {
                const bridge = bridges[0];
                const username = localStorage.getItem('hue-user');
                return username ? {bridge, username} : this.hue.auth(bridge).then(username => ({bridge, username}));
            })
            .then(({bridge, username}) => {
                this.hue.bridge = bridge;
                this.hue.username = username;
                this.refreshLights();
                this.interval = setInterval(this.refreshLights, 10000);
            })
            .catch(console.error);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshLights() {
        this.hue.getLights().then(lights => this.setState({lights})).catch(console.error);
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
