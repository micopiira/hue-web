import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import propTypes from "../../propTypes";
import List from "../List";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import {fetchBridgesThunk, fetchGroupsThunk, fetchLightsThunk, loginOrRegisterThunk} from "../../redux/actions";
import {LoadingIndicator} from "../LoadingIndicator";

class App extends Component {
	static propTypes = {
		error: PropTypes.object,
		dispatch: PropTypes.func,
		bridges: PropTypes.arrayOf(propTypes.bridge)
	};
	state = {
		loading: false,
		error: null
	};

	componentDidMount() {
		this.setState({loading: true});
		this.props.dispatch(fetchBridgesThunk())
			.then(() =>
				this.props.dispatch(loginOrRegisterThunk(this.props.bridges[0]))
			)
			.then(() => {
				this.props.dispatch(fetchGroupsThunk());
				this.props.dispatch(fetchLightsThunk());
			})
			.catch(error => this.setState({error}))
			.finally(() => this.setState({loading: false}));
	}

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
				{this.state.loading &&
				<div className="fixed-top text-right">
					<LoadingIndicator/>
				</div>
				}
				<List/>
			</div>
		);
	}
}

const mapStateToProps = ({error, bridges}, ownProps) => ({
	error,
	bridges
});

export default connect(mapStateToProps)(App);
