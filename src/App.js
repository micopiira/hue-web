import React, {Component} from 'react';
import './App.css';
import Hue from 'philips-hue';
import update from 'immutability-helper';
import List from './List';
import {throttle} from 'throttle-debounce';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    hue = new Hue();

    state = {
        loading: false,
        lights: {}
    };

    constructor(props) {
        super(props);
        this.refreshLights = this.refreshLights.bind(this);
        this.setLightState = this.setLightState.bind(this);
        this._setLightState = throttle(100, this._setLightState);
    }

    setLightState(key, state) {
        this.setState(
            update(this.state, {lights: {[key]: {state: {$merge: state}}}}),
            () => this._setLightState(key, state)
        );
    }

    _setLightState(id, state) {
        this.runWithLoader(this.hue.light(id).setState(state).catch(console.error));
    }

    runWithLoader(promise) {
        this.setState({loading: true});
        promise.then(() => this.setState({loading: false}));
    }

    componentDidMount() {
        this.runWithLoader(
            this.hue.getBridges()
                .then(bridges => {
                    const bridge = bridges[0];
                    const username = localStorage.getItem('hue-user');
                    return username ? {bridge, username} : new Promise((resolve, reject) => {
                        console.log("press link button pls");
                        setTimeout(() => {
                            this.hue.auth(bridge).then(username => resolve({bridge, username})).catch(reject);
                        }, 10000);
                    });
                })
                .then(({bridge, username}) => {
                    this.hue.bridge = bridge;
                    this.hue.username = username;
                    this.refreshLights();
                    this.interval = setInterval(this.refreshLights, 10000);
                })
                .catch(console.error)
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshLights() {
        this.runWithLoader(
            this.hue.getLights()
                .then(lights => this.setState({lights}))
                .catch(console.error)
        );
    }

    render() {
        return (
            <div className="App container">
                {this.state.loading &&
                    <div className="fixed-top text-right">
                        <i className="fa fa-circle-o-notch fa-spin fa-fw text-info m-2"/>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                <List lights={this.state.lights} setLightState={this.setLightState}/>
            </div>
        );
    }
}

export default App;
