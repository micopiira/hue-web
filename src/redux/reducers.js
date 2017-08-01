import {SET_LIGHT_STATE} from './actions';

const lights = (state = {}, action) => {
    switch (action) {
        case SET_LIGHT_STATE:

        default:
            return state;
    }
};