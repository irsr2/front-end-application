import {
    PENDING_GET_SINGLE_ITEM, SUCCESS_GET_SINGLE_ITEM, PENDING_ADD_LOG,
    PENDING_CREATE_ITEM, PENDING_EDIT_ITEM, PENDING_DELETE_ITEM,
    SUCCESS, ERROR
} from '../actions/IssueActions';

import deepCopy from '../utils/deepCopy';

const initialState = {
    item: null,
    pending: false,
    error: null
};

export const IssueReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case PENDING_GET_SINGLE_ITEM:
            newState = deepCopy(state);
            newState.pending = true;
            newState.error = null;
            return newState;
        case SUCCESS_GET_SINGLE_ITEM:
            newState = deepCopy(state);
            newState.item = action.payload;
            newState.pending = false;
            newState.error = null;
            return newState;
        case PENDING_ADD_LOG:
            newState = deepCopy(state);
            newState.pending = true;
            newState.error = null;
            return newState;
        case PENDING_CREATE_ITEM:
            newState = deepCopy(state);
            newState.pending = true;
            newState.error = null;
            return newState;
        case PENDING_EDIT_ITEM:
            newState = deepCopy(state);
            newState.pending = true;
            newState.error = null;
            return newState;
        case PENDING_DELETE_ITEM:
            newState = deepCopy(state);
            newState.pending = true;
            newState.error = null;
            return newState;
        case SUCCESS:
            newState = deepCopy(state);
            newState.pending = false;
            newState.error = null;
        case ERROR:
            newState = deepCopy(state);
            newState.pending = false;
            newState.error = action.payload;
            return newState;
        default:
            return state;
    }
};
