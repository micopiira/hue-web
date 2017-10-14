import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import propTypes from "../propTypes";
import LightGroup from "./LightGroup";

export const List = ({groups}) =>
	groups.map(group =>
		<LightGroup key={group.id} group={group}/>
	);

List.propTypes = {
	groups: PropTypes.arrayOf(propTypes.group)
};

const mapStateToProps = ({groups}) => ({
	groups: groups.filter(group => group.lights)
});

export default connect(mapStateToProps)(List);