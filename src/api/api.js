const ROOT_URL = 'http://localhost:8081';

const LOGIN_URL = ROOT_URL + '/user/login?username=';
const TASK_URL = ROOT_URL + '/task';
const WINDOW_URL = ROOT_URL + '/window';
const USER_URL = ROOT_URL + '/user/';
const DELIVERY_URL = ROOT_URL + '/delivery'

const sendRequest = (url, config) => {
    console.log("config: ", config);
    const { headers } = config;
    // if (headers) {
    //     headers.set('Session-Id', '54321')
    // }
    // var myHeaders = new Headers();
    // myHeaders.append('Session-Id', '54321')
    return fetch(url, config)
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw new Error('Connection error')
        })
}

export function logIn(username, password) {
    return sendRequest(LOGIN_URL + username + '&password=' + password,
        {
            method: 'GET'
        })
}

export function fetchTask() {
    return sendRequest(TASK_URL,
        {
            method: 'GET'
        })
}

export function fetchDeliveryWindow(id) {
    // var myHeaders = new Headers();
    // myHeaders.append('Session-Id', '54321')

    // console.log("myheaders: ", myHeaders)

    return sendRequest(WINDOW_URL + '/' + id,
        {
            method: 'GET',
            // headers: {
            //     'Session-Id': '54321'
            // }
        })
}

export function requestFetchWindowHistory() {
    return sendRequest(DELIVERY_URL, {
        method: 'GET'
    })
}

export function requestFetchIssuer(id) {
    return sendRequest(USER_URL + id, {
        method: 'GET'
    })
}