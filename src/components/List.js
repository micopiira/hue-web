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

	componentDidMount() {
		if (this.props.username) {
			this.props.dispatch(login(this.props.currentBridge, this.props.username));
			this.props.dispatch(fetchLightsThunk()).then(() => this.props.dispatch(fetchGroupsThunk()));
		} else {
			this.props.dispatch(logout());
		}
	}

	render() {
		return <div className="row">
				<div className="col-3">
					<LightSelector currentLight={this.state.currentLight} onChange={light => {
						this.setState({currentLight: light})
					}}/>
				</div>
				<div className="col">
					<div className="container">
					{this.props.lights[this.state.currentLight] ?
					<ListItem light={this.props.lights[this.state.currentLight]}/> : 'No light selected'}
					</div>
				</div>
			</div>;
	}
}

const mapStateToProps = ({usernames, currentBridge, bridges, lights}) => ({
	lights,
	username: usernames[currentBridge],
	currentBridge: bridges.find(bridge => bridge.id === currentBridge)
});

export default connect(mapStateToProps)(List);