import md5 from 'md5'

const ROOT_URL = 'http://localhost:8081';

const LOGIN_URL = ROOT_URL + '/user/login?username=';
const TASK_URL = ROOT_URL + '/task';
const WINDOW_URL = ROOT_URL + '/window';
const USER_URL = ROOT_URL + '/user/';
const DELIVERY_URL = ROOT_URL + '/delivery'

// const checkResponseStatus = (response) => {
//     console.info("request checking status: ", response);
//     if (response.status === 401) {
//         console.info("-> unathorized")
//         throw { error: "Unauthorized" };
//     } else if (response.status < 200 || response.status > 299) {
//         console.info("-> status is < 200 or > 299");
//         throw response.json();
//     } else {
//         console.info("-> status ok")
//         return response;
//     }
// }

const sendRequest = (url, config) => {
    return fetch(url, config)
        // .then(checkResponseStatus)
        .then(response => response.json())
        .then(anything => {
            console.error("fetch returns: ", anything)
            return anything;
        })
}

export function logIn(username, password) {
    var hashPass = md5(password);
    console.log("hash", hashPass)
    return sendRequest(LOGIN_URL + username + '&password=' + hashPass,
        {
            method: 'GET'
        })
}

export function fetchTask() {
    return sendRequest(TASK_URL,
        {
            method: 'GET',
            headers: {
                'session-id': '54321'
            }
        })
}

export function fetchDeliveryWindow(id) {

    return sendRequest(WINDOW_URL + '/' + id,
        {
            method: 'GET',
            headers: {
                'session-id': '54321'
            }
        })
}

export function requestFetchWindowHistory() {
    return sendRequest(DELIVERY_URL, {
        method: 'GET',
        headers: {
            'session-id': '54321'
        }
    })
}

export function requestFetchIssuer(id) {
    return sendRequest(USER_URL + id, {
        method: 'GET',
        headers: {
            'session-id': '54321'
        }
    })
}

export function requestPushDelivery(delivery) {
    return sendRequest(DELIVERY_URL, {
        method: 'POST',
        headers: {
            'session-id': '54321'
        },
        body: JSON.stringify(
            delivery
        )
    })
}