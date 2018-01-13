import { createAction } from 'redux-actions';

//TODO:import api functions

const defaultState = {
    user: {},
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        default:
            return state;
    }
}