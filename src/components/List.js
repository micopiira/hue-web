import React from "react";
import {connect} from "react-redux";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import propTypes from "../propTypes";

const List = ({lights, groups}) =>
	<div>
		{Object.keys(groups).map(groupId => {
			const groupLights = groups[groupId].lights;
			return (groupLights &&
				<div key={groupId} className="card mb-3">
					<div className="card-header">{groups[groupId].name}</div>
					<ul className="list-group list-group-flush">
						{groupLights.map(lightId => {
							const light = lights[lightId];
							return light ? <ListItem key={lightId} light={light}/> : null;
						})}
					</ul>
				</div>
			);
		})}
	</div>;

List.propTypes = {
	lights: PropTypes.objectOf(propTypes.light),
	groups: PropTypes.object
};

const mapStateToProps = ({lights, groups}, ownProps) => ({
	lights,
	groups
});

export default connect(mapStateToProps)(List);