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
		dispatch: PropTypes.func,
		currentBridge: propTypes.bridge
	};
	state = {
		loading: false,
		error: null
	};
	render() {
		return (
			<div className="container">
				{this.state.error &&
				<div className="alert alert-danger mt-4" role="alert">
					<button type="button" className="close" data-dismiss="alert" aria-label="Close"
					        onClick={() => this.setState({error: null})}>
						<span aria-hidden="true">&times;</span>
					</button>
					<strong>Oh snap!</strong> {this.state.error.name + ' ' + this.state.error.message}
				</div>
				}
				{this.state.loading && <div className="fixed-top text-right"><LoadingIndicator/></div>}
				{this.props.currentBridge ? <List/> : <Setup/>}
			</div>
		);
	}
}

const mapStateToProps = ({currentBridge, bridges}) => ({
	currentBridge: bridges.find(bridge => bridge.id === currentBridge)
});

export default connect(mapStateToProps)(App);
