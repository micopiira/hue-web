import React from 'react';
import PropTypes from 'prop-types';
import propTypes, {effects} from '../propTypes';
import ColorPicker from './ColorPicker/ColorPicker';
import CtColorPicker from "./ColorPicker/CtColorPicker";

const ListItem = ({light, setLightState}) =>
    <div className="card">
        <div className="card-block">
        <div className="row">
            <div className="col-sm-2">
                <button type="button"
                        disabled={!light.state.reachable}
                        className={'btn btn-primary' + (light.state.on ? ' active' : '')}
                        aria-pressed={light.state.on}
                        onClick={() => setLightState({on: !light.state.on})}>
                    <i className="fa fa-power-off" aria-hidden="true"/>
                </button>
            </div>
            <div className="col-sm-10">{light.name}</div>
        </div>
        <div className="row">
            <div className="col">
            <div className="form-group row">
                <label htmlFor="effect" className="col-sm-6 col-form-label">
                    Effect
                </label>
                <select disabled={!light.state.on || !light.state.reachable}
                        id="effect"
                        className="form-control col-sm-6"
                        onChange={(event) => setLightState({effect: event.target.value})}
                        value={light.state.effect}>
                    {effects.map(effect =>
                        <option key={effect} value={effect}>{effect}</option>
                    )}
                </select>
            </div>
            <CtColorPicker onChange={({ct}) => setLightState({ct})}/>
            <ColorPicker
                onChange={({xy}) => setLightState({xy})}
                color={{h: parseInt(light.state.hue / (65535 / 360), 10), s: light.state.sat / 254, l: 0.5}}/>
            <div className="form-group row">
                <label htmlFor="brightness" className="col-sm-6 col-form-label">Brightness</label>
                <input type="range"
                       className="col-sm-6"
                       id="brightness"
                       disabled={!light.state.on || !light.state.reachable}
                       value={light.state.bri}
                       onChange={(event) => setLightState({bri: parseInt(event.target.value, 10)})}
                       min={0}
                       max={254}/>
            </div>
            </div>
        </div>
        </div>
    </div>;

ListItem.propTypes = {
    light: propTypes.light,
    setLightState: PropTypes.func,
};

export default ListItem;