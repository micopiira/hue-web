import PropTypes from 'prop-types';

export const effects = ['none', 'colorloop'];

const octet = (props, propName, componentName) => {
	const value = props[propName];
	if (!(value >= 0 && value <= 255)) {
		return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Octet value should be 0 - 255, '${value}' given.`);
	}
};

const light = {
	manufacturername: PropTypes.string,
	modelid: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
	productid: PropTypes.string,
	state: PropTypes.shape({
		alert: PropTypes.oneOf(['none', 'select', 'lselect']),
		bri: PropTypes.number,
		colormode: PropTypes.oneOf(['hs', 'xy', 'ct']),
		ct: PropTypes.number,
		effect: PropTypes.oneOf(effects),
		hue: PropTypes.number,
		on: PropTypes.bool,
		reachable: PropTypes.bool,
		sat: PropTypes.number,
	}),
	swconfigid: PropTypes.string,
	swversion: PropTypes.string,
	type: PropTypes.string,
	uniqueid: PropTypes.string,
};

export default {
	octet,
	group: PropTypes.shape({
		action: PropTypes.object,
		class: PropTypes.string,
		id: PropTypes.string,
		lights: PropTypes.arrayOf(light.id),
		name: PropTypes.string,
		recycle: PropTypes.bool,
		state: PropTypes.object,
		type: PropTypes.string
	}),
	rgb: PropTypes.shape({
		r: octet,
		g: octet,
		b: octet
	}),
	bridge: PropTypes.shape({
		id: PropTypes.string,
		ipaddress: PropTypes.string,
	}),
	light
}