class API {
    constructor(path) {
        this.basePath = path;
    }
    getRequest(path, callback) {
        let headers = {
            'Content-Type': 'application/json'
        }
        if ('token' in localStorage) {
            headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        fetch(`${this.basePath}${path}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (data) => {
                callback(data, null);
            }
        ).catch(
            (error) => {
                callback(null, error);
            }
        );
    }
    postRequest(path, postData, callback) {
        let headers = {
            'Content-Type': 'application/json'
        }
        if ('token' in localStorage) {
            headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        fetch(`${this.basePath}${path}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, и т.д.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(postData) // должно соответствовать заголовку Content-Type
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (data) => {
                if ("error" in data) {
                    callback(null, data);
                } else {
                    callback(data, null);
                }
            }
        ).catch(
            (error) => {
                callback(null, error);
            }
        );
    }
    register(email, password, callback) {
        this.postRequest('/auth/register', {email,password}, callback);
    }
    login(email, password, callback) {
        this.postRequest('/auth/login', {email,password}, callback);
    }
}

const apiClient = new API('/api');