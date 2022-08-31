export const initialState = {
    current_token: null
}; 

// other state is handled using mysql for every account created
function reducer(state, action) {
    switch(action.type) {
        case 'SET_TOKEN': {
            return {
                ...state,
                current_token: action.token
            };
        }
        
        default: {
            return state
        }
    };
}

export default reducer;