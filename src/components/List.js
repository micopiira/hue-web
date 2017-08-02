import React from 'react';
import { connect } from 'react-redux'
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import propTypes from '../propTypes';

const List = ({lights, setLightState}) =>
    <div className="card-columns">
        {Object.keys(lights).map(id => {
            return <ListItem key={id} light={lights[id]} setLightState={(state) => setLightState(id, state)}/>;
        })}
    </div>;

List.propTypes = {
    lights: PropTypes.objectOf(propTypes.light),
    setLightState: PropTypes.func
};

const mapStateToProps = ({lights}, ownProps) => ({
    lights
});

export default connect(mapStateToProps)(List);