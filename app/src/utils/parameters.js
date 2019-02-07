export const ServerAddress = "localhost:5000";

export const getServerLink = suffix => `http://${ServerAddress}${suffix}`;

export const getAuthHeader = getState => {
    const { token } = getState().user;
    return { headers: { Authorization: token } };
}

export const getAuthHeaderWithId = (getState, id) => {
    const { token } = getState().user;
    return { headers: { Authorization: token }, params: { id: id } };
}

export const LOGIN_PATH = '/app/login';
export const REGISTER_PATH = '/app/register';
export const HOME_PATH = '/app';
export const ISSUE_PATH = '/app/issue/:id';
export const ADD_ITEM_PATH = '/app/add';
export const EDIT_ITEM_PATH = '/app/edit/:id';
export const NULL_PATH = '/';

export const getIssuePath = id => `/app/issue/${id}`;
export const getEditItemPath = id => `/app/edit/${id}`;
