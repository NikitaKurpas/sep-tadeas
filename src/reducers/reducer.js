import { createAction } from 'redux-actions';

//TODO:import api functions
import {
    logIn,
    fetchTask
} from '../api/api'

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"

export const logInUser = (username, password) => (dispatch, getState) => {
    dispatch(createAction(LOGIN_USER)())

    return logIn(username, password).then(
        data => {
            dispatch(createAction(LOGIN_USER_SUCCESS)(data))
        }
    )
}

export const FETCH_DASHBOARD = "FETCH_DASHBOARD"
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS"
export const FETCH_DASHBOARD_FAILED = "FETCH_DASHBOARD_FAILED"

export const fetchDashboard = () => (dispatch, getState) => {
    dispatch(createAction(FETCH_DASHBOARD)())

    return fetchTask().then(
        data => {
            dispatch(createAction(FETCH_DASHBOARD_SUCCESS)(data))
        }
    )
}

const defaultState = {
    loading: false,
    isLogedIn: false,
    user: {},
    tasks: []
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLogedIn: true,
            }
        case FETCH_DASHBOARD:
            return {
                ...state,
                loading: true
            }
        case FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload
            }
        default:
            return state;
    }
}