

// Handles state involving logins and user data.

const initialState = {
    userData: null,
    pending: false,
    error: null
};

export const UserReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        default:
            console.warn(`UserReducer: Unhandled action type: ${action.type}`);
            return state;
    }
};