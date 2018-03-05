import React, {Component} from "react";

class ErrorBoundary extends Component {
	state = {
		hasError: false
	};

	componentDidCatch(error, info) {
		this.setState({hasError: true});
	}

	render() {
		if (this.state.hasError) {
			return <div className="alert alert-danger mt-4" role="alert">
				<button type="button" className="close" data-dismiss="alert" aria-label="Close"
				        onClick={() => this.setState({hasError: false})}>
					<span aria-hidden="true">&times;</span>
				</button>
				<strong>Oh snap!</strong> Something went wrong
			</div>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;