import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchBridgesThunk, loginOrRegisterThunk} from "../redux/actions";

class Setup extends Component {

	componentDidMount() {
		this.props.dispatch(fetchBridgesThunk());
	}

	bridgesList() {
		return <div className="container"><div className="list-group">
			{this.props.bridges.map(bridge =>
				<button className="list-group-item list-group-item-action"
				   key={bridge.id}
				   onClick={() => this.props.dispatch(loginOrRegisterThunk(bridge))}>
					{bridge.ipaddress}
				</button>
			)}
		</div></div>;
	}

	noBridges() {
		return this.props.loading ? <p>Loading</p> : <p>No bridges found</p>;
	}

	render() {
		return this.props.bridges.length > 0 ? this.bridgesList() : this.noBridges();
	}
}

const mapStateToProps = ({bridges, loading}) => ({
	bridges,
	loading
});

export default connect(mapStateToProps)(Setup);