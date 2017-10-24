import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import propTypes from "../propTypes";
import LightGroup from "./LightGroup";
import {fetchGroupsThunk, fetchLightsThunk, login, logout} from "../redux/actions";

class List extends React.Component {
	static propTypes = {
		groups: PropTypes.arrayOf(propTypes.group),
		dispatch: PropTypes.func
	};

	componentDidMount() {
		if (this.props.username) {
			this.props.dispatch(login(this.props.currentBridge, this.props.username));
			this.props.dispatch(fetchGroupsThunk());
			this.props.dispatch(fetchLightsThunk());
		} else {
			this.props.dispatch(logout());
		}
	}

	render() {
		return this.props.groups.map(group =>
			<LightGroup key={group.id} group={group}/>
		);
	}
}

const mapStateToProps = ({groups, usernames, currentBridge, bridges}) => ({
	groups: groups.filter(group => group.lights),
	username: usernames[currentBridge],
	currentBridge: bridges.find(bridge => bridge.id === currentBridge)
});

export default connect(mapStateToProps)(List);