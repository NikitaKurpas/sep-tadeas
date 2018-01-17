const ROOT_URL = 'http://localhost:8081';

const LOGIN_URL = ROOT_URL + '/user/login?username=';
const TASK_URL = ROOT_URL + '/task';
const WINDOW_URL = ROOT_URL + '/window'

const sendRequest = (url, config) => {
    // const { headers } = config;
    console.log("config: ", config);
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
    return sendRequest(WINDOW_URL + '/' + id,
        {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Session-Id': '54321'
            }
        })
}