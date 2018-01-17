const ROOT_URL = 'http://localhost:8081';

const LOGIN_URL = ROOT_URL + '/user/login?username=';
const TASK_URL = ROOT_URL + '/task';
const WINDOW_URL = ROOT_URL + '/window'

const sendRequest = (url, config) => {
    console.log("config: ", config);
    const { headers } = config;
    // if (headers) {
    //     headers.set('Session-Id', '54321')
    // }
    // var myHeaders = new Headers();
    // myHeaders.append('Session-Id', '54321')
    return fetch(url, { 'Session-Id': '54321' })
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
            headers: new Headers({
                'Session-Id': '54321'
            })
        })
}