import axios from 'axios';
import { getServerLink } from '../utils/parameters';

export const PENDING_GET_ITEMS = 'PENDING_GET_ITEMS';
export const PENDING_GET_ITEMS_BROKEN = 'PENDING_GET_ITEMS_BROKEN';
export const SUCCESS_GET_ITEMS = 'SUCCESS_GET_ITEMS';
export const ERROR_GET_ITEMS = 'ERROR_GET_ITEMS';

export const getBrokenItems = _ => dispatch => {
    dispatch({ type: PENDING_GET_ITEMS_BROKEN });
    axios
        .get(getServerLink('/'))
        .then(({ data }) => {
            dispatch({ type: SUCCESS_GET_ITEMS, payload: data});
        })
        .catch(err => {
            dispatch({ type: ERROR_GET_ITEMS, payload: err});
        });
};

export const getItems = _ => dispatch => {
    dispatch({ type: PENDING_GET_ITEMS });
    axios
        .get(getServerLink('/equipment'))
        .then(({ data }) => {
            dispatch({ type: SUCCESS_GET_ITEMS, payload: data});
        })
        .catch(err => {
            dispatch ({ type: ERROR_GET_ITEMS, payload: err});
        })
};
