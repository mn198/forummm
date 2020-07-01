const initState = {
    isLoading: true,
    thread: null,
}

export const threadReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_THREAD':
            return {
                ...state,
                thread: action.payload,
                isLoading: false
            }

        case 'RESET_THREAD':
            return {
                thread: null,
                isLoading: true
            }
        
        default:
            return state;
    }
}