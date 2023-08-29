import {configureStore} from '@reduxjs/toolkit';

const IS_LOGIN = "IS_LOGIN";
const SET_USER = "SET_USER";

const changeIsLogin = (item) => {
    return {
        type: IS_LOGIN,
        payload: item
    }
}

const setUser = (item) => {
    return {
        type: SET_USER,
        payload: item
    }
}

const initialState = {
    isLogin: false,
    user: {

    }
}

const userReducer = (state= initialState, action) => {

    switch(action.type){
        case IS_LOGIN:
            return {...state, isLogin: action.payload}
        case SET_USER:
            return {...state, user: action.payload}

        default:
            return state;
    }
}

const store = configureStore(
    {
        reducer:userReducer
    }
)

export {store, changeIsLogin, setUser};