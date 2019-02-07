import axios from 'axios';
import { getServerLink } from '../utils/parameters';

export const PENDING_USER_REGISTER = 'PENDING_USER_REGISTER';
export const SUCCESS_USER_REGISTER = 'SUCCESS_USER_REGISTER';
export const ERROR_USER_REGISTER = 'ERROR_USER_REGISTER';

export const PENDING_USER_LOGIN = 'PENDING_USER_LOGIN';
export const SUCCESS_USER_LOGIN = 'SUCCESS_USER_LOGIN';
export const ERROR_USER_LOGIN = 'ERROR_USER_LOGIN';

export const USER_LOGOUT = 'USER_LOGOUT';

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
            dispatch({ type: SUCCESS_USER_LOGIN, payload: data});
        })
        .catch(err => {
            dispatch({ type: ERROR_USER_LOGIN, payload: err});
        });
};

export const logout = _ => dispatch => {
    dispatch({ type: USER_LOGOUT });
};
