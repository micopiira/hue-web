import React, {Component} from 'react';
import './App.css';
import Hue, {HueApi} from 'node-hue-api';
import update from 'immutability-helper';
import List from '../List';
import {throttle} from 'throttle-debounce';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

const arrayToObject = (arr, keyField) => Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));

class App extends Component {

    api = new HueApi();

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
        console.log(`Setting light #${key} state to ${JSON.stringify(state)}`);
        this.setState(prevState =>
            update(prevState, {lights: {[key]: {state: {$merge: state}}}}),
            () => this._setLightState(key, state)
        );
    }

    _setLightState(id, state) {
        this.runWithLoader(this.api.setLightState(id, state).catch(this.handleError));
    }

    runWithLoader(promise) {
        this.setState({loading: true});
        promise.then(() => this.setState({loading: false}));
    }

    authenticate(bridge) {
        return new Promise((resolve, reject) => {
            const username = localStorage.getItem(bridge);
            if (username) {
                console.log(`Found username for bridge ${bridge}`);
                resolve(username);
            } else {
                console.log(`No username found for bridge ${bridge}, starting linking`);
                if (window.confirm(`Press link button on bridge ${bridge} and then click OK`)) {
                    this.api.createUser(bridge).then(username => {
                        localStorage.setItem(bridge, username);
                        resolve(username);
                    }).catch(reject);
                } else {
                    reject("User cancelled linking");
                }
            }
        }).then(username => {
            this.api = new HueApi(bridge, username);
            this.refreshLights();
            this.interval = setInterval(this.refreshLights, 10000);
        });
    }

    componentDidMount() {
        console.log("Searching for bridges...");
        this.runWithLoader(
            Hue.nupnpSearch()
                .then(bridges => {
                    const bridge = bridges[0].ipaddress;
                    if (bridge) {
                        console.log(`Found bridge at ${bridge}`);
                        return bridge;
                    }
                    throw new Error("No bridges found. Try manually typing the bridge IP address.");
                })
                .then(this.authenticate)
                .catch(this.handleError)
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshLights() {
        console.log("Searching for lights...");
        this.runWithLoader(
            this.api.lights()
                .then(({lights}) => {
                    console.log(`Found ${lights.length} lights`);
                    this.setState({lights: arrayToObject(lights, 'id')});
                })
                .catch(this.handleError)
        );
    }

    render() {
        return (
            <div className="App container">
                <div className="row my-3 input-group">
                    <input className="form-control col" ref={(input) => this.input = input} type="text" placeholder="Bridge IP Address" defaultValue={this.api.bridge || ''}/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary col"
                                onClick={() => this.runWithLoader(this.authenticate(this.input.value).catch(this.handleError))}>
                            Link
                        </button>
                    </span>
                </div>
                {this.state.error &&
                    <div className="alert alert-danger mt-4" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                                onClick={() => this.setState({error: null})}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>Oh snap!</strong> {this.state.error.name + ' ' + this.state.error.message}
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
