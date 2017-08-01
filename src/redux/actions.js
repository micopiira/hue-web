export const SET_LIGHT_STATE = 'SET_LIGHT_STATE';

export const setLightState = (id, state) => ({
    type: SET_LIGHT_STATE,
    payload: {id, state}
});