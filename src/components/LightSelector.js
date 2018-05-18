import React from "react";
import PropTypes from "prop-types";
import propTypes from "../propTypes";
import {connect} from "react-redux";

const LightSelector = ({groups, lights, currentLight, onChange}) => <select value={currentLight} onChange={onChange}
                                                                            className="custom-select">
	{groups.map(group =>
		<optgroup key={group.id} label={group.name}>
			{group.lights.map(lightId =>
				<option value={lightId}
				        key={lightId}>{lights[lightId].name}{!lights[lightId].state.reachable && " (Unreachable)"}</option>
			)}
		</optgroup>
	)}
</select>;

LightSelector.propTypes = {
	currentLight: propTypes.light.id,
	groups: PropTypes.arrayOf(propTypes.group),
	lights: PropTypes.objectOf(PropTypes.shape(propTypes.light)),
	onChange: PropTypes.func
};

const mapStateToProps = ({groups, lights}) => ({groups, lights});

export default connect(mapStateToProps)(LightSelector);