import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import propTypes from "../../propTypes";
import List from "../List";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import {fetchBridgesThunk, fetchGroupsThunk, fetchLightsThunk, loginOrRegisterThunk} from "../../redux/actions";

class App extends Component {
    static propTypes = {
        error: PropTypes.object,
        dispatch: PropTypes.func,
        bridges: PropTypes.objectOf(propTypes.bridge)
    };

    componentDidMount() {
        this.props.dispatch(fetchBridgesThunk())
            .then(() =>
                this.props.dispatch(loginOrRegisterThunk(this.props.bridges[Object.keys(this.props.bridges)[0]]))
            )
            .then(() => {
                this.props.dispatch(fetchGroupsThunk());
                this.props.dispatch(fetchLightsThunk());
            });
    }

    render() {
        return (
	        <div className="container">
                {false &&
                    <div className="alert alert-danger mt-4" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                                onClick={() => this.setState({error: null})}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>Oh snap!</strong> {this.state.error.name + ' ' + this.state.error.message}
                    </div>
                }
                {false &&
                    <div className="fixed-top text-right">
                        <i className="fa fa-circle-o-notch fa-spin fa-fw text-info m-2"/>
                        <span className="sr-only">Loading...</span>
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
