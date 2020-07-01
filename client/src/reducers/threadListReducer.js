const initState = {
    isLoading: true,
    threadslist: null,
}

export const threadListReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_THREAD_LIST':
            return {
                ...state,
                threadlist: action.payload,
                isLoading: false
            }

        case 'RESET_THREAD_LIST':
            return {
                threadlist: null,
                isLoading: true
            }
        
        default:
            return state;
    }
}