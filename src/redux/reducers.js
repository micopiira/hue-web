import update from 'immutability-helper';
import {SET_LIGHT_STATE} from './actions';

export const lights = (state = {}, action) => {
    switch (action) {
        case SET_LIGHT_STATE:
            const { payload } = action;
            return update(state, {[payload.id]: {state: {$merge: payload.state}}});
        default:
            return state;
    }
};