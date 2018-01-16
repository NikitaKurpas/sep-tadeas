const ROOT_URL = 'http://localhost:8081';

const LOGIN_URL = ROOT_URL + '/user/login?username=';
const TASK_URL = ROOT_URL + '/task';

const sendRequest = (url, ...config) => {
    console.log("url: ", url);
    return fetch(url, ...config)
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw new Error('Connection error')
        })
}

export function logIn(username, password) {
    return sendRequest(LOGIN_URL + username + '&password=' + password)
}

export function fetchTask() {
    return sendRequest(TASK_URL)
}