import React from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import propTypes from "../propTypes";
import {connect} from "react-redux";
import {identity} from '../fn';

export const LightGroup = ({group, lights}) =>
	<div>
		<h1>{group.name}</h1>
		<div className="card-deck">
			{lights.map(light =>
				<ListItem key={light.uniqueid} light={light}/>
			)}
		</div>
	</div>;

LightGroup.propTypes = {
	group: PropTypes.object,
	lights: PropTypes.arrayOf(propTypes.light)
};

const mapStateToProps = ({lights}, ownProps) => ({
	lights: ownProps.group.lights.map(lightId => lights[lightId]).filter(identity),
});

export default connect(mapStateToProps)(LightGroup);