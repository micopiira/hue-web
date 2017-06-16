import React from 'react';
import Hue from 'node-hue-api';
import update from 'immutability-helper';
import hexRgb from 'hex-rgb';
import PropTypes from 'prop-types';

const lightState = Hue.lightState;

const ListItem = ({light, setLightState}) =>
    <li key={light.id}>
        <input checked={light.state.on} type="checkbox" onChange={(event) => setLightState({on: event.target.checked})}/>

        <select disabled={!light.state.on}
                onChange={(event) => setLightState({effect: event.target.value})}
                value={light.state.effect}>
            <option value="none">none</option>
            <option value="colorloop">colorloop</option>
        </select>

        <input type="color"
               disabled={light.state.effect !== 'none'}
               onChange={(event) => setLightState(lightState.create().rgb(hexRgb(event.target.value)))}/>

        <input type="range"
               disabled={!light.state.on}
               value={light.state.bri}
               onChange={(event) => setLightState({bri: parseInt(event.target.value)})}
               min={0}
               max={254}/>

        <pre style={{backgroundColor: 'hsl(' + [light.state.hue / 182, light.state.sat / 2.54 + '%', '50%'].join(',') + ')'}}><code>{JSON.stringify(update(light, {$unset: ['state']}), null, 2)}</code></pre>
    </li>;

ListItem.propTypes = {
    light: PropTypes.object,
    setLightState: PropTypes.func,
};

export default ListItem;