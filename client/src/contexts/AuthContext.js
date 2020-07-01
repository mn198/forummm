import React, { createContext, useReducer, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { authReducer } from '../reducers/authReducer';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const authContext = createContext();

const AuthContextProvider = (props) => {
    const initState = {
        isAuthenticated: false,
        user: null
    }

    const [auth, dispatch] = useReducer(authReducer, initState);

    useEffect(() => {
        if(localStorage.jwtToken){
            const token = localStorage.jwtToken;
            const decoded = jwt_decode(token);
            setAuthToken(token);
            dispatch({type: 'LOGIN', payload: decoded})
        }
    }, [])

    return (
        <authContext.Provider value={{auth, dispatch}}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;