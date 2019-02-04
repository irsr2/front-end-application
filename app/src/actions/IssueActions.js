import axios from 'axios';
import { getServerLink } from '../utils/parameters';

export const PENDING_GET_SINGLE_ITEM = 'PENDING_GET_SINGLE_ITEM';
export const SUCCESS_GET_SINGLE_ITEM = 'SUCCESS_GET_SINGLE_ITEM';
export const ERROR_GET_SINGLE_ITEM = 'ERROR_GET_SINGLE_ITEM';

export const getSingleItem = id => dispatch => {
    dispatch({ type: PENDING_GET_SINGLE_ITEM, payload: id});
    axios
        .get(getServerLink(`/singlePage/${id}`), { params: { id: id} })
        .then(({ data }) => {
            dispatch({ type: SUCCESS_GET_SINGLE_ITEM, payload: data});
        })
        .catch(err => {
            dispatch({ type: ERROR_GET_SINGLE_ITEM, payload: err});
        });
}
