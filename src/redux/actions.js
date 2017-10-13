import Hue from "node-hue-api";

export const types = {
    SET_LIGHT_STATE: 'SET_LIGHT_STATE',
    FETCH_LIGHTS_SUCCESS: 'FETCH_LIGHTS_SUCCESS',
    FETCH_BRIDGES_SUCCESS: 'FETCH_BRIDGES_SUCCESS',
    FETCH_GROUPS_SUCCESS: 'FETCH_GROUPS_SUCCESS',
    LOGIN: 'LOGIN',
	ERROR: 'ERROR',
	REGISTER: 'REGISTER'
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

export const login = (bridge, username) => ({
    type: 'LOGIN',
    payload: {host: bridge.ipaddress, username}
});

export const createError = error => ({
    type: types.ERROR,
    payload: error
});

export const fetchBridgesThunk = () => dispatch =>
    Hue.nupnpSearch().then(bridges => {
        dispatch(fetchBridgesSuccess(arrayToObject(bridges, 'id')));
    });

export const setLightStateThunk = (id, state) => (dispatch, getState) => {
    dispatch(setLightState(id, state));
    return getState().api.setLightState(id, state).then(() => dispatch(fetchLightsThunk()));
};

export const fetchGroupsThunk = () => (dispatch, getState) =>
    getState().api.groups()
        .then(groups => {
            dispatch(fetchGroupsSuccess(arrayToObject(groups, 'id')));
        })
        .catch(error => dispatch(createError(error)));

export const fetchLightsThunk = () => (dispatch, getState) =>
    getState().api.lights()
        .then(({lights}) => {
            dispatch(fetchLightsSuccess(arrayToObject(lights, 'id')));
        })
        .catch(error => dispatch(createError(error)));

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
            reject("User cancelled linking");
        }
    }
}).then(username => {
    dispatch(login(bridge, username))
});

