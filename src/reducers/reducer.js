export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"

export const FETCH_DASHBOARD = "FETCH_DASHBOARD"
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS"
export const FETCH_DASHBOARD_FAILED = "FETCH_DASHBOARD_FAILED"

export const FETCH_DELIVERY_WINDOW = "FETCH_DELIVERY_WINDOW"
export const FETCH_DELIVERY_WINDOW_SUCCESS = "FETCH_DELIVERY_WINDOW_SUCCESS"
export const FETCH_DELIVERY_WINDOW_FAILED = "FETCH_DELIVERY_WINDOW_SUCCESS"

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
        case FETCH_DELIVERY_WINDOW:
            return {
                ...state,
                loading: true
            }
        case FETCH_DELIVERY_WINDOW_SUCCESS:
            var indexOfTask = state.tasks.findIndex(i => i.id == action.window.id)
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    [indexOfTask] = action.window
                ]
            }
        default:
            return state;
    }
}