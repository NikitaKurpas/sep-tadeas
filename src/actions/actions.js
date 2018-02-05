//TODO:import api functions
import {
    logIn,
    fetchTask,
    fetchDeliveryWindow,
    requestFetchIssuer,
    requestFetchWindowHistory,
    requestPushDelivery
} from '../api/api'

import toastr from 'toastr'

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
            user => {
                localStorage.setItem('tadeas-session-id', user.sessionId)
                localStorage.setItem('tadeas-user', user)
                dispatch(logInUserSuccess(user))
            }
        ).catch(async error => {
            var mes = await error;
            if (mes.errorMessage) {
                toastr.error("Wrong username or password")
            } else {
                toastr.error("Cannot connect to server");
            }
        });
    }
}

export const FETCH_DASHBOARD = "FETCH_DASHBOARD"
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS"

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

export function fetchWindowBegin() {
    return { type: FETCH_DELIVERY_WINDOW }
}

export function fetchWindowSuccess(window) {
    return { type: FETCH_DELIVERY_WINDOW_SUCCESS, window }
}

export function fetchTaskDetail(id) {
    return function (dispatch) {
        dispatch(fetchWindowBegin())

        return fetchDeliveryWindow(id).then(
            data => {
                dispatch(fetchIssuer(data.issuer))
                dispatch(fetchWindowSuccess(data))
            }
        )
    }
}

export const FETCH_ISSUER = 'FETCH_ISSUER';
export const FETCH_ISSUER_SUCCESS = 'FETCH_ISSUER_SUCCESS'

export function fetchIssuerBegin() {
    return { type: FETCH_ISSUER }
}

export function fetchIssuerSuccess(issuer) {
    return { type: FETCH_ISSUER_SUCCESS, issuer }
}

export function fetchIssuer(id) {
    return function (dispatch) {
        dispatch(fetchIssuerBegin())

        return requestFetchIssuer(id).then(
            data => {
                dispatch(fetchIssuerSuccess(data))
            }
        )
    }
}

export const FETCH_HISTORY_WINDOW = 'FETCH_HISTORY_WINDOW'
export const FETCH_HISTORY_WINDOW_SUCCESS = 'FETCH_HISTORY_WINDOW_SUCCESS'

export function fetchHistoryBegin() {
    return { type: FETCH_HISTORY_WINDOW }
}

export function fetchHistorySuccess(windows) {
    return { type: FETCH_HISTORY_WINDOW_SUCCESS, windows }
}

export function fetchWindowHistory() {
    return function (dispatch) {
        dispatch(fetchHistoryBegin())

        return requestFetchWindowHistory().then(
            data => {
                dispatch(fetchHistorySuccess(data))
            }
        )
    }
}

export const PUSH_DELIVERY = 'PUSH_DELIVERY'
export const PUSH_DELIVERY_SUCCESS = 'PUSH_DELIVERY_SUCCESS'

export function pushDeliveryBegin() {
    return { type: PUSH_DELIVERY }
}

export function pushDeliverySuccess(delivery) {
    return { type: PUSH_DELIVERY_SUCCESS, delivery }
}

export function pushDelivery(delivery) {
    return function (dispatch) {
        dispatch(pushDeliveryBegin())

        return requestPushDelivery(delivery).then(
            data => {
                toastr.success(data.message)
                dispatch(pushDeliverySuccess(delivery))
            }).catch(
            error => {
                toastr.error(error.message)
            })
    }
}