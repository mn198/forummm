import axios from 'axios';

const initState = {
    isAuthenticated: false,
    user: null
};

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const authReducer = (state=initState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case 'LOGOUT':

            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            
            return {
                isAuthenticated: false,
                user: {}
            }
        default:
            return state;
        
    }
}