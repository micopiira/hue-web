import React from "react";
import PropTypes from "prop-types";
import propTypes from "../propTypes";
import {connect} from "react-redux";

const LightSelector = ({groups, lights, currentLight, onChange}) => <ul className="list-group list-group-flush">
	{groups.map(group =>
		<li key={group.id} className="list-group-item">
			<strong>{group.name}</strong>
			<div className="list-group list-group-flush">
			{group.lights.map(lightId =>
				<button className={"list-group-item list-group-item-action" + (currentLight == lightId ? " active" : "")}
				    onClick={() => onChange(lightId)}
				    key={lightId}
			        title={!lights[lightId].state.reachable ? "Unreachable" : ""}
					disabled={!lights[lightId].state.reachable}>
					{lights[lightId].name}
				</button>
			)}
			</div>
		</li>
	)}
</ul>;

LightSelector.propTypes = {
	currentLight: propTypes.light.id,
	groups: PropTypes.arrayOf(propTypes.group),
	lights: PropTypes.objectOf(PropTypes.shape(propTypes.light)),
	onChange: PropTypes.func
};

const mapStateToProps = ({groups, lights}) => ({groups, lights});

export default connect(mapStateToProps)(LightSelector);