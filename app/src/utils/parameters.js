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
