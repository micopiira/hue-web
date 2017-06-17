import React from 'react';
import PropTypes from 'prop-types';
import propTypes, {effects} from './propTypes';

const ListItem = ({light, setLightState}) =>
    <li className="list-unstyled">
        <div className="row">
            <div className="col">
                <input type="checkbox"
                       disabled={!light.state.reachable}
                       checked={light.state.on}
                       onChange={(event) => setLightState({on: event.target.checked})}/>
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

                    <input type="color"
                           disabled={light.state.effect !== 'none' || !light.state.reachable}
                           onChange={(event) => alert(event.target.value)}/>

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