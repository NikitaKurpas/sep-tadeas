export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"

export const FETCH_DASHBOARD = "FETCH_DASHBOARD"
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS"
export const FETCH_DASHBOARD_FAILED = "FETCH_DASHBOARD_FAILED"

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
                user: action.user,
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
                tasks: Object.assign([], action.tasks)
            };
        default:
            return state;
    }
}