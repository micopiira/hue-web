import React from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import propTypes from "../propTypes";
import {connect} from "react-redux";

export const LightGroup = ({group, lights}) =>
	<div className="card mb-3">
		<div className="card-header">{group.name}</div>
		<ul className="list-group list-group-flush">
			{lights.map(light => {
				return light ? <ListItem key={light.uniqueid} light={light}/> : null;
			})}
		</ul>
	</div>;

LightGroup.propTypes = {
	group: PropTypes.object,
	lights: PropTypes.arrayOf(propTypes.light)
};

const mapStateToProps = ({lights}, ownProps) => ({
	lights: ownProps.group.lights.map(lightId => lights[lightId]),
});

export default connect(mapStateToProps)(LightGroup);