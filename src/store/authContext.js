import {createContext, useState, useEffect, useCallback} from 'react'

// Functions and variables used by AuthContextProvider
const defaultValues = {
    userId: null,
    token: "",
    login: () => {},
    logout: () => {}
}

// Imported by components. Holds default context values. Components connect to authContext through this, but do NOT access these default object values. Components access values inside of "value" prop of AuthContextProvider.
export const AuthContext = createContext(defaultValues)

// Imported by index.js. Used as a wrapper so components have access to context.
export const AuthContextProvider = (props) => {


    // const contextValue = {
    //     userId: userId,
    //     token: token,
    //     login: loginHandler,
    //     logout: logoutHandler
    // }

    // return (
    //     <AuthContext.Provider value={contextValue}>
    //         {props.children}
    //     </AuthContext.Provider>
    // )
}