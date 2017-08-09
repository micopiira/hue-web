import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import propTypes from '../propTypes';

const List = ({lights, groups}) =>
    <ul>
        {Object.keys(groups).map(groupId => {
            const groupLights = groups[groupId].lights;
            return (groupLights &&
                <li>
                    <h1>{groups[groupId].name}</h1>
                    <ul>
                        {groupLights.map(lightId => <ListItem key={lightId} light={lights[lightId]}/>)}
                    </ul>
                </li>
            );
        })}
    </ul>;

List.propTypes = {
    lights: PropTypes.objectOf(propTypes.light),
    groups: PropTypes.object
};

const mapStateToProps = ({lights, groups}, ownProps) => ({
    lights,
    groups
});

export default connect(mapStateToProps)(List);