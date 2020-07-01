import React, { createContext, useReducer } from 'react';
import {threadReducer} from '../reducers/threadReducer';

export const threadContext = createContext();

export const ThreadListContextProvider = (props) => {
    const initState = {
        isLoading: true,
        thread: null
    }

    const [ thread, dispatch ] = useReducer(threadReducer, initState);

    return(
        <threadContext.Provider value={{thread, dispatch}}>
            {props.children}
        </threadContext.Provider>
    )
}

export default ThreadListContextProvider;