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

export const register = (name, email, password, isBoard, onSuccess, onError) => dispatch => {
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
            if (onSuccess)
                onSuccess();
        })
        .catch(err => {
            dispatch({ type: ERROR_USER_REGISTER, payload: err });
            if (onError)
                onError();
        });
};

export const login = (email, password, onSuccess, onError) => dispatch => {
    dispatch({ type: PENDING_USER_LOGIN });

    const request = {
        email: email,
        password: password
    };

    axios
        .post(getServerLink('/api/login'), request)
        .then(({ data }) => {
            dispatch({ type: SUCCESS_USER_LOGIN, payload: data});
            storeLogin(data);
            if (onSuccess)
                onSuccess();
        })
        .catch(err => {
            dispatch({ type: ERROR_USER_LOGIN, payload: err});
            if (onError)
                onError();
        });
};

const storeLogin = (data) => {
    sessionStorage.setItem('irsr2-token', data.token);
    sessionStorage.setItem('irsr2-userId', data.user.id);
    sessionStorage.setItem('irsr2-username', data.user.name);
    sessionStorage.setItem('irsr2-role', data.user.role);
};

export const logout = _ => dispatch => {
    dispatch({ type: USER_LOGOUT });
    sessionStorage.clear();
};

export const checkCachedLogin = _ => dispatch => {
    const token = sessionStorage.getItem('irsr2-token');
    const userId = sessionStorage.getItem('irsr2-userId');
    const username = sessionStorage.getItem('irsr2-username');
    const role = sessionStorage.getItem('irsr2-role');
    
    if (token && userId && username && role) {
        const request = {
            token: token,
            userId: userId,
            username: username,
            isBoard: role == 2
        };
        dispatch({ type: USER_CACHE_LOGIN, payload: request });
    }
}
