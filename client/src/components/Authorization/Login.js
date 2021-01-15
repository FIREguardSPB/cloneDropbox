import React, {useState} from 'react';
import Input from "../../utills/Input/Input";
import {login} from '../../actions/user'
import {useDispatch} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    return (
        <div className="registration">
            <div className="Header">ВХОД</div>
            <Input value={email} setValue={setEmail} type="email" placeholder="email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="password"/>

            <button className="registration_btn" onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    );
};

export default Login;