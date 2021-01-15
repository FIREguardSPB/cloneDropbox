import React, {useState} from 'react';
import Input from "../../utills/Input/Input";
import {registration} from '../../actions/user'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="registration">
            <div className="Header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="email" placeholder="email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="password"/>

            <button className="registration_btn" onClick={() => registration(email, password)} >Зарегистрировать</button>
        </div>
    );
};

export default Registration;