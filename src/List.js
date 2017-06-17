import React from 'react';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import propTypes from './propTypes';

const List = ({lights, setLightState}) =>
    <ul>
        {Object.keys(lights).map(id => {
            return <ListItem key={id} light={lights[id]} setLightState={(state) => setLightState(id, state)}/>;
        })}
    </ul>;

List.propTypes = {
    lights: PropTypes.objectOf(propTypes.light),
    setLightState: PropTypes.func
};

export default List;