import React from 'react';
import './navbar.less'
import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../reducers/userReducer"

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div className="navbar_header">FILE STORAGE APP</div>
            {!isAuth && <div className="navbar_login"><NavLink to="/login"> ВОЙТИ</NavLink></div>}
            {!isAuth && <div className="navbar_registrations"><NavLink to="/registration">РЕГИСТРАЦИЯ</NavLink></div>}
            {isAuth && <div className="navbar_registrations" onClick={() => dispatch(logout())} >Выйти</div>}

        </div>
    );
};

export default Navbar