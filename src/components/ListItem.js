import React from 'react';
import PropTypes from 'prop-types';
import propTypes, {effects} from '../propTypes';
import ColorPicker from './ColorPicker/ColorPicker';
import CtColorPicker from "./ColorPicker/CtColorPicker";

const ListItem = ({light, setLightState}) =>
    <li className="list-group-item">
        <div className="row">
            <div className="col">
                <button type="button"
                        disabled={!light.state.reachable}
                        className={'btn btn-primary' + (light.state.on ? ' active' : '')}
                        aria-pressed={light.state.on}
                        onClick={() => setLightState({on: !light.state.on})}>
                    <i className="fa fa-power-off" aria-hidden="true"/>
                </button>
            </div>
            <div className="col">
                <div className="row">
                    {light.name}
                </div>
                <div className="row">
                        <div className="form-group">
                        <label htmlFor="effect">
                            Effect
                        </label>
                        <select disabled={!light.state.on || !light.state.reachable}
                                id="effect"
                                className="form-control"
                                onChange={(event) => setLightState({effect: event.target.value})}
                                value={light.state.effect}>
                            {effects.map(effect =>
                                <option key={effect} value={effect}>{effect}</option>
                            )}
                        </select>
                    </div>
                    <CtColorPicker
                        onChange={({ct}) => setLightState({ct})}/>
                    <ColorPicker
                        onChange={({xy}) => setLightState({xy})}
                        color={{h: parseInt(light.state.hue / (65535 / 360), 10), s: light.state.sat / 254, l: 0.5}}/>
                    <label>Brightness
                    <input type="range"
                           disabled={!light.state.on || !light.state.reachable}
                           value={light.state.bri}
                           onChange={(event) => setLightState({bri: parseInt(event.target.value, 10)})}
                           min={0}
                           max={254}/>
                    </label>
                </div>
            </div>
        </div>
    </li>;

ListItem.propTypes = {
    light: propTypes.light,
    setLightState: PropTypes.func,
};

export default ListItem;