import React from 'react';
import PropTypes from 'prop-types';
import propTypes, {effects} from './propTypes';
import { PhotoshopPicker } from 'react-color';

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

                    <select disabled={!light.state.on || !light.state.reachable}
                            onChange={(event) => setLightState({effect: event.target.value})}
                            value={light.state.effect}>
                        {effects.map(effect =>
                            <option key={effect} value={effect}>{effect}</option>
                        )}
                    </select>
                    <PhotoshopPicker
                        color={{h: parseInt(light.state.hue / (65535 / 360), 10), s: light.state.sat / 254, l: .5}}
                        onChangeComplete={({hsv}) => {console.log(hsv);setLightState({hue: parseInt(hsv.h * (65535 / 360), 10), sat: parseInt(hsv.s * 254, 10)})}}/>

                    <input type="range"
                           disabled={!light.state.on || !light.state.reachable}
                           value={light.state.bri}
                           onChange={(event) => setLightState({bri: parseInt(event.target.value, 10)})}
                           min={0}
                           max={254}/>
                </div>
            </div>
        </div>
    </li>;

ListItem.propTypes = {
    light: propTypes.light,
    setLightState: PropTypes.func,
};

export default ListItem;