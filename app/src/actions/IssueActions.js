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

const requestPromise = (dispatch, getState, request, onSuccess, onError) => {
    request
        .then(({ data }) => {
            dispatch({ type: SUCCESS, payload: data });
            if (onSuccess)
                onSuccess(dispatch, getState);
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err });
            if (onError)
                onError(dispatch, getState);
        });
};

export const getSingleItem = id => (dispatch, getState) => {
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

export const addBoardLog = (equipmentId, status, comment, onSuccess) => (dispatch, getState) => {
    dispatch({ type: PENDING_ADD_LOG });

    const request = {
        equipmentId: equipmentId,
        status: status,
        boardUser: getState().user.userId,
        boardComment: comment
    };

    requestPromise(dispatch, getState, axios.post(getServerLink('/boardLog'), request, getAuthHeader(getState)), onSuccess);
}

export const addSchoolLog = (equipmentId, broken, comment, onSuccess) => (dispatch, getState) => {
    dispatch({ type: PENDING_ADD_LOG });
    
    const request = {
        equipmentId: equipmentId,
        broken: broken,
        user: getState().user.userId,
        comment: comment
    };

    console.dir(request);

    requestPromise(dispatch, getState, axios.post(getServerLink('/schoolLog'), request, getAuthHeader(getState)), onSuccess);
}

export const addItem = (type, broken, imageFile, onSuccess) => (dispatch, getState) => {
    dispatch({ type: PENDING_CREATE_ITEM });

    let formData = new FormData();
    formData.append('equipmentImage', imageFile);
    formData.append('type', type);
    formData.append('broken', broken ? 1 : 0);

    requestPromise(dispatch, getState, axios.post(getServerLink('/equipment'), formData, getAuthHeader(getState)), onSuccess);
}

export const editItem = (id, type, broken, imageFile, onSuccess) => (dispatch, getState) => {
    dispatch({ type: PENDING_EDIT_ITEM });

    let formData = new FormData();
    if (imageFile)
        formData.append('equipmentImage', imageFile);
    if (type && type.length > 0)
        formData.append('type', type);
    formData.append('broken', broken ? 1 : 0);

    requestPromise(dispatch, getState, axios.put(getServerLink(`/equipment/${id}`), formData, getAuthHeaderWithId(getState, id)), onSuccess);
}

export const deleteItem = (id, onSuccess, onError) => (dispatch, getState) => {
    dispatch({ type: PENDING_DELETE_ITEM });

    requestPromise(dispatch, getState, axios.delete(getServerLink(`/equipment/${id}`), getAuthHeaderWithId(getState, id)), onSuccess, onError);
}
