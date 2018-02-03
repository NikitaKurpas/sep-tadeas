import {
    FETCH_ISSUER,
    FETCH_ISSUER_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    FETCH_DASHBOARD,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAILED,
    FETCH_DELIVERY_WINDOW,
    FETCH_DELIVERY_WINDOW_SUCCESS,
    FETCH_DELIVERY_WINDOW_FAILED,
    FETCH_HISTORY_WINDOW,
    FETCH_HISTORY_WINDOW_SUCCESS,
    PUSH_DELIVERY,
    PUSH_DELIVERY_SUCCESS,
    LOGOUT_USER
} from "../actions/actions";

const defaultState = {
    loading: false,
    isLogedIn: false,
    activeWindowId: null,
    user: {},
    tasks: [],
    windowHistory: []
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
                // tasks: action.tasks.reduce((accumulator, task) => {
                //     accumulator[task.id] = task
                //     return accumulator
                // })
            };
        case FETCH_DELIVERY_WINDOW:
            return {
                ...state,
                loading: true
            }
        case FETCH_DELIVERY_WINDOW_SUCCESS:
            var indexOfTask = state.tasks.findIndex(i => i.id == action.window.id)
            console.log("indexOfTask", indexOfTask, "action.window:", action.window)
            return {
                ...state,
                activeWindowId: indexOfTask,
                tasks: state.tasks.map((task, index) => {
                    if (index == indexOfTask) {
                        return action.window
                    }
                    return task
                })
            }
        case FETCH_ISSUER:
            return {
                ...state,
                loading: true
            }
        case FETCH_ISSUER_SUCCESS:
            return {
                ...state,
                loading: false,
                issuer: action.issuer
            }
        case FETCH_HISTORY_WINDOW:
            return {
                ...state,
                loading: true
            }
        case FETCH_HISTORY_WINDOW_SUCCESS:
            return {
                ...state,
                // windowHistory: action.windows.reduce((accumulator, window) => {
                //     if (window.deliveryUser == state.user.id) {
                //         accumulator.push(window)
                //         return accumulator
                //     }
                // }, [])                
                windowHistory: action.windows
            }
        case PUSH_DELIVERY_SUCCESS:
            return {
                ...state,
                windowHistory: [
                    ...state.windowHistory,
                    action.delivery
                ]
            }
        default:
            return state;
    }
}