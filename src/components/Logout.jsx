import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changeIsLogin, setUser } from "../store";
import { useDispatch
 } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => { 
        localStorage.removeItem('user');
        dispatch(changeIsLogin(false));
        dispatch(setUser({}));
        navigate('/');
    }, [])
}

export default Logout;