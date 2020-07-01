import React, { createContext, useReducer } from 'react';
import {threadListReducer} from '../reducers/threadListReducer';

export const threadListContext = createContext();

export const ThreadListContextProvider = (props) => {
    const initState = {
        isLoading: true,
        threadlist: null
    }

    const [ threads, dispatch ] = useReducer(threadListReducer, initState);

    return(
        <threadListContext.Provider value={{threads, dispatch}}>
            {props.children}
        </threadListContext.Provider>
    )
}

export default ThreadListContextProvider;