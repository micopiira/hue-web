import React from "react";
import PropTypes from "prop-types";
import propTypes from "../propTypes";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setLightStateThunk} from "../redux/actions";
import ListItem from "./ListItem";

const LightSelector = ({groups, lights, currentLight, onChange, setLightState}) => <ul className="list-group list-group-flush">
	{groups.map(group =>
		<li key={group.id} className="list-group-item">
			<h5>{group.name}</h5>
			<div className="list-group list-group-flush">
			{group.lights.map(lightId => {
				const reachable = lights[lightId].state.reachable;
				const cssClass = [
					["list-group-item list-group-item-action d-flex justify-content-between align-items-center", true],
					["active", currentLight == lightId],
					["disabled", !reachable]
				].map(arr => arr[1] ? arr[0] : []).join(" ");

				return <div className={cssClass}
				     onClick={() => reachable ? onChange(lightId) : {}}
				     key={lightId}
				     title={!reachable ? "Unreachable" : ""}>
					{lights[lightId].name}
					<input type="checkbox"
					       disabled={!reachable}
					       checked={lights[lightId].state.on && reachable}
					       onChange={() => setLightState(lightId, {on: !lights[lightId].state.on})}/>
				</div>
			}
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

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	setLightState: (lightId, state) => setLightStateThunk(lightId, state)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LightSelector);