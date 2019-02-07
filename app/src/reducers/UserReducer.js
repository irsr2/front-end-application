

// Handles state involving logins and user data.

const initialState = {
    userData: null,
    isBoard: true,
    pending: false,
    error: null
};

export const UserReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        default:
            return state;
    }
};