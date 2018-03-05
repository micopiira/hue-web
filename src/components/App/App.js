import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import propTypes from "../../propTypes";
import List from "../List";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import {LoadingIndicator} from "../LoadingIndicator";
import Setup from '../Setup';

class App extends Component {
	static propTypes = {
		error: PropTypes.object,
		loading: PropTypes.bool,
		dispatch: PropTypes.func,
		currentBridge: propTypes.bridge
	};

	render() {
		return (
			<div className="container">
				{this.props.loading && <div className="fixed-top text-right"><LoadingIndicator/></div>}
				{this.props.currentBridge ? <List/> : <Setup/>}
			</div>
		);
	}
}

const mapStateToProps = ({currentBridge, bridges, loading}) => ({
	loading,
	currentBridge: bridges.find(bridge => bridge.id === currentBridge)
});

export default connect(mapStateToProps)(App);
