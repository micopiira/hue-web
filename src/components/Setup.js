import React, {Component} from "react";
import {connect} from "react-redux";
import {loginOrRegisterThunk} from "../redux/actions";

class Setup extends Component {
	render() {
		return <ul>
			{this.props.bridges.map(bridge =>
				<li key={bridge.id}>
					{bridge.ipaddress}
					<button className="btn btn-primary"
					        onClick={() => this.props.dispatch(loginOrRegisterThunk(bridge))}>connect
					</button>
				</li>
			)}
		</ul>;
	}
}

const mapStateToProps = ({bridges}, ownProps) => ({
	bridges
});

export default connect(mapStateToProps)(Setup);