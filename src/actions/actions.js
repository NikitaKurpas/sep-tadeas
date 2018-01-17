//TODO:import api functions
import {
    logIn,
    fetchTask,
    fetchDeliveryWindow
} from '../api/api'

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"

export function logInUserBegin() {
    return { type: LOGIN_USER };
}

export function logInUserSuccess(user) {
    return { type: LOGIN_USER_SUCCESS, user };
}

export function logInUser(username, password) {
    return function (dispatch) {
        dispatch(logInUserBegin())

        return logIn(username, password).then(
            user => dispatch(logInUserSuccess(user))
        ).catch(error => {
            throw (error);
        });
    }
}

export const FETCH_DASHBOARD = "FETCH_DASHBOARD"
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS"
export const FETCH_DASHBOARD_FAILED = "FETCH_DASHBOARD_FAILED"

export function fetchDashboardBegin() {
    return { type: FETCH_DASHBOARD }
}

export function fetchDashboardSuccess(tasks) {
    return { type: FETCH_DASHBOARD_SUCCESS, tasks }
}

export function fetchDashboard() {
    return function (dispatch) {
        dispatch(fetchDashboardBegin())

        return fetchTask().then(
            data => {
                dispatch(fetchDashboardSuccess(data))
            }
        )

    }
}

export const FETCH_DELIVERY_WINDOW = "FETCH_DELIVERY_WINDOW"
export const FETCH_DELIVERY_WINDOW_SUCCESS = "FETCH_DELIVERY_WINDOW_SUCCESS"
export const FETCH_DELIVERY_WINDOW_FAILED = "FETCH_DELIVERY_WINDOW_SUCCESS"

export function fetchWindowBegin() {
    return { type: FETCH_DELIVERY_WINDOW }
}

export function fetchWindowSuccess(window) {
    return { type: FETCH_DASHBOARD_SUCCESS, window }
}

export function fetchTaskDetail(id) {
    return function (dispatch) {
        dispatch(fetchWindowBegin())

        return fetchDeliveryWindow(id).then(
            data => {
                dispatch(fetchWindowSuccess(data))
            }
        )
    }
}