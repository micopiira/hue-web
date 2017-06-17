import React from 'react';
import Hue from 'node-hue-api';
import hexRgb from 'hex-rgb';
import PropTypes from 'prop-types';
import propTypes from './propTypes';

const lightState = Hue.lightState;

const ListItem = ({light, setLightState}) =>
    <li key={light.id}>
        <input type="checkbox"
               disabled={!light.state.reachable}
               checked={light.state.on}
               onChange={(event) => setLightState({on: event.target.checked})}/>

        <select disabled={!light.state.on || !light.state.reachable}
                onChange={(event) => setLightState({effect: event.target.value})}
                value={light.state.effect}>
            <option value="none">none</option>
            <option value="colorloop">colorloop</option>
        </select>

        <input type="color"
               disabled={light.state.effect !== 'none' || !light.state.reachable}
               onChange={(event) => setLightState(lightState.create().rgb(hexRgb(event.target.value)))}/>

        <input type="range"
               disabled={!light.state.on || !light.state.reachable}
               value={light.state.bri}
               onChange={(event) => setLightState({bri: parseInt(event.target.value, 10)})}
               min={0}
               max={254}/>

        <pre style={{backgroundColor: 'hsl(' + [light.state.hue / 182, light.state.sat / 2.54 + '%', '50%'].join(',') + ')'}}><code>{JSON.stringify(light, null, 2)}</code></pre>
    </li>;

ListItem.propTypes = {
    light: propTypes.light,
    setLightState: PropTypes.func,
};

export default ListItem;