import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchBridgesThunk, loginOrRegisterThunk} from "../redux/actions";

class Setup extends Component {

	componentDidMount() {
		this.props.dispatch(fetchBridgesThunk());
	}

	render() {
		return this.props.bridges.length > 0 ? <ul>
			{this.props.bridges.map(bridge =>
				<li key={bridge.id}>
					{bridge.ipaddress}
					<button className="btn btn-primary"
					        onClick={() => this.props.dispatch(loginOrRegisterThunk(bridge))}>connect
					</button>
				</li>
			)}
		</ul> : <p>No bridges found</p>;
	}
}

const mapStateToProps = ({bridges}) => ({
	bridges
});

export default connect(mapStateToProps)(Setup);