import {lights} from './reducers';
import {setLightState} from './actions';


it('sets light state', () => {
	const initialState = {1: {state: {a: 'b', c: 'd'}, e: {f: 'g'}}};
	const wantedState = {1: {state: {a: 'a', c: 'd'}, e: {f: 'g'}}};
	const action = setLightState(1, {a: 'a'});
	expect(lights(initialState, action)).toMatchObject(wantedState);
});