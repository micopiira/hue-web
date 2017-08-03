import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import propTypes from '../propTypes';

const List = ({lights}) =>
    <div className="card-columns">
        {Object.keys(lights).map(id => {
            return <ListItem key={id} light={lights[id]}/>;
        })}
    </div>;

List.propTypes = {
    lights: PropTypes.objectOf(propTypes.light)
};

const mapStateToProps = ({lights}, ownProps) => ({
    lights
});

export default connect(mapStateToProps)(List);