import React, {Component} from 'react';
import './App.css';
import Hue from 'philips-hue';
import update from 'immutability-helper';
import List from '../List';
import {throttle} from 'throttle-debounce';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    hue = new Hue();

    state = {
        loading: false,
        lights: {}
    };

    handleError(error) {
        console.error(error);
        this.setState({error, loading: false});
    }

    constructor(props) {
        super(props);
        this.refreshLights = this.refreshLights.bind(this);
        this.setLightState = this.setLightState.bind(this);
        this.handleError = this.handleError.bind(this);
        this._setLightState = throttle(100, this._setLightState);
        this.authenticate = this.authenticate.bind(this);
    }

    setLightState(key, state) {
        this.setState(
            update(this.state, {lights: {[key]: {state: {$merge: state}}}}),
            () => this._setLightState(key, state)
        );
    }

    _setLightState(id, state) {
        this.runWithLoader(this.hue.light(id).setState(state).catch(this.handleError));
    }

    runWithLoader(promise) {
        this.setState({loading: true});
        promise.then(() => this.setState({loading: false}));
    }

    authenticate(bridge) {
        return new Promise((resolve, reject) => {
            const username = localStorage.getItem(bridge);
            if (username) {
                resolve(username);
            } else {
                console.log("press link button pls");
                setTimeout(() => {
                    this.hue.auth(bridge).then(username => {
                        localStorage.setItem(bridge, username);
                        resolve(username);
                    }).catch(reject);
                }, 10000);
            }
        }).then(username => {
            this.hue.bridge = bridge;
            this.hue.username = username;
            this.refreshLights();
            this.interval = setInterval(this.refreshLights, 10000);
        });
    }

    componentDidMount() {
        this.runWithLoader(
            this.hue.getBridges()
                .then(bridges => bridges[0])
                .then(this.authenticate)
                .catch(this.handleError)
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshLights() {
        this.runWithLoader(
            this.hue.getLights()
                .then(lights => this.setState({lights}))
                .catch(this.handleError)
        );
    }

    render() {
        return (
            <div className="App container">
                <input ref={(input) => this.input = input} type="text" placeholder="Bridge IP Address"/>
                <button onClick={() => this.runWithLoader(this.authenticate(this.input.value).catch(this.handleError))}>auth</button>

                {this.state.error &&
                    <div className="alert alert-danger mt-4" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.setState({error: null})}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>Oh snap!</strong> {this.state.error.message}
                    </div>
                }
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
