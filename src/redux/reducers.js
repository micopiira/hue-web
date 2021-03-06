import {types} from './actions';
import {HueApi} from 'node-hue-api';

export const api = (state = new HueApi(), action) => {
	switch (action.type) {
		case types.LOGIN:
			const {bridge, username} = action.payload;
			return new HueApi(bridge.ipaddress, username);
		default:
			return state;
	}
};

export const loading = (state = false, action) => {
	return !action.type.includes("_SUCCESS");
};

export const currentBridge = (state = null, action) => {
	switch (action.type) {
		case types.LOGIN:
			return action.payload.bridge.id;
		case types.LOGOUT:
			return null;
		default:
			return state;
	}
};

export const groups = (state = [], action) => {
	switch (action.type) {
		case types.FETCH_GROUPS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};

export const bridges = (state = [], action) => {
	switch (action.type) {
		case types.FETCH_BRIDGES_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};

export const usernames = (state = {}, action) => {
	switch (action.type) {
		case types.REGISTER:
			return {...state, [action.payload.bridgeId]: action.payload.username};
		default:
			return state;
	}
};

export const lights = (state = {}, action) => {
	switch (action.type) {
		case types.FETCH_LIGHTS_SUCCESS:
			return action.payload;
		case types.SET_LIGHT_STATE:
			const {payload} = action;
			return {...state, ...{[payload.id]: {...state[payload.id], ...{state: {...state[payload.id].state, ...payload.state}}}}};
		default:
			return state;
	}
};