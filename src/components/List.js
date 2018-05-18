import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchGroupsThunk, fetchLightsThunk, login, logout} from "../redux/actions";
import ListItem from "./ListItem";
import LightSelector from "./LightSelector";

class List extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	state = {
		currentLight: ''
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (Object.values(nextProps.lights)[0] && !prevState.currentLight) {
			return {currentLight: Object.values(nextProps.lights)[0].id};
		}
		return null;
	}

	componentDidMount() {
		if (this.props.username) {
			this.props.dispatch(login(this.props.currentBridge, this.props.username));
			this.props.dispatch(fetchLightsThunk()).then(() => this.props.dispatch(fetchGroupsThunk()));
		} else {
			this.props.dispatch(logout());
		}
	}

	render() {
		return [
			<div key={0} className="form-group m-2">
				<LightSelector currentLight={this.state.currentLight} onChange={event => {
					this.setState({currentLight: event.target.value})
				}}/>
			</div>,
			<div key={1}>{this.props.lights[this.state.currentLight] ?
				<ListItem light={this.props.lights[this.state.currentLight]}/> : 'No light selected'}</div>
		];
	}
}

const mapStateToProps = ({usernames, currentBridge, bridges, lights}) => ({
	lights,
	username: usernames[currentBridge],
	currentBridge: bridges.find(bridge => bridge.id === currentBridge)
});

export default connect(mapStateToProps)(List);