import React from 'react';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import propTypes from './propTypes';

const List = ({lights, setLightState}) =>
    <ul>
        {lights.map((light, index) => {
            return <ListItem key={light.id} light={light} setLightState={(state) => setLightState(index, state)}/>;
        })}
    </ul>;

List.propTypes = {
    lights: PropTypes.arrayOf(propTypes.light),
    setLightState: PropTypes.func
};

export default List;