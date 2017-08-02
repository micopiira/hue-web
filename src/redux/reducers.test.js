import { lights } from './reducers';
import { setLightState } from './actions';



it('sets light state', () => {
    const initialState = {1: {state: {a: 'b', c: 'd'}}};
    const wantedState = {1: {state: {a: 'a', c: 'd'}}};
    const action = setLightState(1, {a: 'a'});
    expect(lights(initialState, action)).toMatchObject(wantedState);
});