import Hue from "node-hue-api";

export const types = {
	SET_LIGHT_STATE: 'SET_LIGHT_STATE',
	FETCH_LIGHTS: 'FETCH_LIGHTS',
	FETCH_LIGHTS_SUCCESS: 'FETCH_LIGHTS_SUCCESS',
	FETCH_BRIDGES: 'FETCH_BRIDGES',
	FETCH_BRIDGES_SUCCESS: 'FETCH_BRIDGES_SUCCESS',
	FETCH_GROUPS_SUCCESS: 'FETCH_GROUPS_SUCCESS',
	LOGIN: 'LOGIN',
	REGISTER: 'REGISTER',
	LOGOUT: 'LOGOUT'
};

const arrayToObject = (arr, keyField) => Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));

export const setLightState = (id, state) => ({
	type: types.SET_LIGHT_STATE,
	payload: {id, state}
});

export const fetchLightsSuccess = lights => ({
	type: types.FETCH_LIGHTS_SUCCESS,
	payload: lights
});

export const fetchGroupsSuccess = groups => ({
	type: types.FETCH_GROUPS_SUCCESS,
	payload: groups
});

export const fetchBridgesSuccess = bridges => ({
	type: types.FETCH_BRIDGES_SUCCESS,
	payload: bridges
});

export const register = (bridgeId, username) => ({
	type: types.REGISTER,
	payload: {bridgeId, username}
});

export const logout = () => ({
	type: types.LOGOUT
});

export const login = (bridge, username) => ({
	type: types.LOGIN,
	payload: {bridge, username}
});

export const fetchBridgesThunk = () => dispatch => {
	dispatch({type: types.FETCH_BRIDGES});
	return Hue.nupnpSearch().then(bridges => {
		dispatch(fetchBridgesSuccess(bridges));
	});
};

export const setLightStateThunk = (id, state) => (dispatch, getState) => {
	dispatch(setLightState(id, state));
	return getState().api.setLightState(id, state).then(() => dispatch(fetchLightsThunk()));
};

export const fetchGroupsThunk = () => (dispatch, getState) =>
	getState().api.groups()
		.then(groups => {
			dispatch(fetchGroupsSuccess(groups.filter(group => group.type === "Room")));
		});

export const fetchLightsThunk = () => (dispatch, getState) => {
	dispatch({type: types.FETCH_LIGHTS});
	return getState().api.lights()
		.then(({lights}) => {
			dispatch(fetchLightsSuccess(arrayToObject(lights, 'id')));
		});
};

export const loginOrRegisterThunk = bridge => (dispatch, getState) => new Promise((resolve, reject) => {
	const username = getState().usernames[bridge.id];
	if (username) {
		resolve(username);
	} else {
		if (window.confirm(`Press link button on bridge ${bridge.ipaddress} and then click OK`)) {
			getState().api.createUser(bridge.ipaddress).then(username => {
				dispatch(register(bridge.id, username));
				resolve(username);
			}).catch(reject);
		} else {
			reject(new Error("User cancelled linking"));
		}
	}
}).then(username => {
	dispatch(login(bridge, username))
});

