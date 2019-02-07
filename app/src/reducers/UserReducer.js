import { PENDING_USER_REGISTER, SUCCESS_USER_REGISTER, ERROR_USER_REGISTER, PENDING_USER_LOGIN, 
    SUCCESS_USER_LOGIN, ERROR_USER_LOGIN, USER_LOGOUT, USER_CACHE_LOGIN } from '../actions/UserActions';
import deepCopy from '../utils/deepCopy';
// Handles state involving logins and user data.

const initialState = {
    username: null,
    token: null,
    pending: false,
    error: null
};

export const UserReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case PENDING_USER_REGISTER:
            newState = deepCopy(state);
            newState.pending = true;
            newState.error = null;
            return newState;
        case SUCCESS_USER_REGISTER:
            newState = deepCopy(state);
            newState.pending = false;
            newState.error = null;
            return newState;
        case ERROR_USER_REGISTER:
            newState = deepCopy(state);
            newState.pending = false;
            newState.error = action.payload;
            return newState;
        case PENDING_USER_LOGIN:
            newState = deepCopy(state);
            newState.pending = true;
            newState.error = null;
            return newState;
        case SUCCESS_USER_LOGIN:
            newState = deepCopy(state);
            newState.username = action.payload.message.substring(8); // Hacky way of taking out the "Welcome " part of the msg.
            newState.token = action.payload.token;
            newState.pending = false;
            newState.error = null;
            return newState;
        case ERROR_USER_LOGIN:
            newState = deepCopy(state);
            newState.pending = false;
            newState.error = action.payload;
            return newState;
        case USER_LOGOUT:
            newState = deepCopy(state);
            newState.username = null;
            newState.token = null;
            newState.pending = false;
            newState.error = null;
            return newState;
        case USER_CACHE_LOGIN:
            newState = deepCopy(state);
            newState.username = action.payload.username;
            newState.token = action.payload.token;
            newState.pending = false;
            newState.error = null;
            return newState;
        default:
            return state;
    }
};