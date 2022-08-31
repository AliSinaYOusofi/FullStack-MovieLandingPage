import React, {useContext, createContext, useReducer} from "react";

export const Context = createContext();

export const ContextProvider = (({children, initialState, reducer}) => (
    <Context.Provider value={useReducer(reducer, initialState)}>
        {children}
    </Context.Provider>
));
// use this to save a user account details
// for now only the email is enough
// throw the email we can get the user details
export const useGloablData = () => useContext(Context);