import axios from 'axios';
import { getAuthHeader, getAuthHeaderWithId, getServerLink } from '../utils/parameters';

export const PENDING_GET_SINGLE_ITEM = 'PENDING_GET_SINGLE_ITEM';
export const SUCCESS_GET_SINGLE_ITEM = 'SUCCESS_GET_SINGLE_ITEM';

export const PENDING_ADD_LOG = 'PENDING_ADD_LOG';
export const PENDING_CREATE_ITEM = 'PENDING_CREATE_ITEM';
export const PENDING_EDIT_ITEM = 'PENDING_EDIT_ITEM';
export const PENDING_DELETE_ITEM = 'PENDING_DELETE_ITEM';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

const requestPromise = (dispatch, request) => {
    request
        .then(({ data }) => {
            dispatch({ type: SUCCESS, payload: data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err });
        });
};

export const getSingleItem = id => (dispatch, getState)=> {
    dispatch({ type: PENDING_GET_SINGLE_ITEM, payload: id});
    axios
        .get(getServerLink(`/singlePage/${id}`), getAuthHeaderWithId(getState, id))
        .then(({ data }) => {
            dispatch({ type: SUCCESS_GET_SINGLE_ITEM, payload: data});
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err});
        });
}

export const addBoardLog = (equipmentId, status, comment) => (dispatch, getState) => {
    dispatch({ type: PENDING_ADD_LOG });

    const request = {
        equipmentId: equipmentId,
        status: status,
        boardUser: getState().user.username,
        boardComment: comment
    };

    requestPromise(dispatch, axios.post(getServerLink('/boardLog'), request, getAuthHeader(getState)));  
}

export const addSchoolLog = (equipmentId, broken, comment) => (dispatch, getState) => {
    dispatch({ type: PENDING_ADD_LOG });
    
    const request = {
        equipmentId: equipmentId,
        broken: broken,
        user: getState().user.username,
        commend: comment
    };

    requestPromise(dispatch, axios.post(getServerLink('/schoolLog'), request, getAuthHeader(getState)));
}

export const addItem = (type, broken, imageFile) => (dispatch, getState) => {
    dispatch({ type: PENDING_CREATE_ITEM });

    let formData = new FormData();
    formData.append('equipmentImage', imageFile);
    formData.append('type', type);
    formData.append('broken', broken ? 1 : 0);

    requestPromise(dispatch, axios.post(getServerLink('/equipment'), formData, getAuthHeader(getState)));
}

export const editItem = (id, type, broken) => (dispatch, getState) => {
    dispatch({ type: PENDING_EDIT_ITEM });

    const request = {
        type: type,
        broken: broken
    };

    requestPromise(dispatch, axios.put(getServerLink(`/equipment/${id}`), request, getAuthHeaderWithId(getState, id)));
}

export const deleteItem = id => (dispatch, getState) => {
    dispatch({ type: PENDING_DELETE_ITEM });

    requestPromise(dispatch, axios.delete(getServerLink(`/equipment/${id}`), getAuthHeaderWithId(getState, id)));
}
