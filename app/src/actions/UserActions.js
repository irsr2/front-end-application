import axios from 'axios';
import { getServerLink } from '../utils/parameters';

export const PENDING_USER_REGISTER = 'PENDING_USER_REGISTER';
export const SUCCESS_USER_REGISTER = 'SUCCESS_USER_REGISTER';
export const ERROR_USER_REGISTER = 'ERROR_USER_REGISTER';

export const PENDING_USER_LOGIN = 'PENDING_USER_LOGIN';
export const SUCCESS_USER_LOGIN = 'SUCCESS_USER_LOGIN';
export const ERROR_USER_LOGIN = 'ERROR_USER_LOGIN';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_CACHE_LOGIN = 'USER_CACHE_LOGIN';

export const register = (name, email, password, isBoard) => dispatch => {
    dispatch({ type: PENDING_USER_REGISTER });

    const request = {
        name: name,
        email: email,
        password: password,
        role: isBoard ? 2 : 1
    };
    axios
        .post(getServerLink('/api/register'), request)
        .then(_ => {
            dispatch({ type: SUCCESS_USER_REGISTER });
            // Redirect to login page
        })
        .catch(err => {
            dispatch({ type: ERROR_USER_REGISTER, payload: err });
        });
};

export const login = (email, password) => dispatch => {
    dispatch({ type: PENDING_USER_LOGIN });

    const request = {
        email: email,
        password: password
    };

    axios
        .post(getServerLink('/api/login'), request)
        .then(({ data }) => {
            storeLogin(data.message.substring(8), data.token);  // Hacky way of taking out the "Welcome " part of the msg.
            dispatch({ type: SUCCESS_USER_LOGIN, payload: data});
        })
        .catch(err => {
            dispatch({ type: ERROR_USER_LOGIN, payload: err});
        });
};

const storeLogin = (username, token) => {
    sessionStorage.setItem('irsr2username', username);
    sessionStorage.setItem('irsr2token', token);
};

export const logout = _ => dispatch => {
    dispatch({ type: USER_LOGOUT });
    sessionStorage.clear();
};

export const checkCachedLogin = _ => dispatch => {
    const username = sessionStorage.getItem('irsr2username');
    const token = sessionStorage.getItem('irsr2token');
    if (username && token) {
        const request = {
            username: username,
            token: token
        };
        dispatch({ type: USER_CACHE_LOGIN, payload: request });
    }
}
