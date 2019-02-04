import { PENDING_GET_ITEMS, PENDING_GET_ITEMS_BROKEN, SUCCESS_GET_ITEMS, ERROR_GET_ITEMS } from '../actions/HomeActions';
import deepCopy from '../utils/deepCopy';

export const DISPLAY_TYPE_BROKEN = 'DISPLAY_TYPE_BROKEN';
export const DISPLAY_TYPE_ALL = 'DISPLAY_TYPE_ALL';

const initialState = {
    items: [],
    displayType: DISPLAY_TYPE_ALL,
    pending: false,
    error: null
};

export const HomeReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case PENDING_GET_ITEMS:
            newState = deepCopy(state);
            newState.displayType = DISPLAY_TYPE_ALL;
            newState.pending = true;
        case PENDING_GET_ITEMS_BROKEN:
            newState = deepCopy(state);
            newState.displayType = DISPLAY_TYPE_BROKEN;
            newState.pending = true;
            newState.error = null;
            return newState;
        case SUCCESS_GET_ITEMS:
            newState = deepCopy(state);
            newState.items = action.payload;
            newState.pending = false;
            newState.error = null;
            return newState;
        case ERROR_GET_ITEMS:
            newState = deepCopy(state);
            newState.pending = false;
            newState.error = action.payload;
            return newState;
        default:
            console.warn(`HomeReducer: Unhandled action type: ${action.type}`);
            return state;
    }
};
