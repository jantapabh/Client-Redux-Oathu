import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import StudentList from './StudentList'
import InputForm from './InputForm'
import FacebookLogin from 'react-facebook-login';
import './LoginForm.css';
// import { bindActionCreators } from 'react-redux/node_modules/redux';
import { AuthActions } from '../redux/store';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import config from '../config'


const LoginForm = () => {

    const actions = bindActionCreators(AuthActions, useDispatch());
    const [facebookLink, setFacebookLink] = useState('');

    const getFacebookLink = async () => {

        const res = await axios.get(`${config.apiUrl}/auth/facebook`);
        setFacebookLink(res.data);
    }

    useEffect(() => {
        getFacebookLink()
    }, []);

    const loginPSU = e => {

        e.prevenDefault();
        const { username, password } = e.target.elements
        actions.loginPSU(username.value, password.value)
    }
    return (

        <div>
            <div>
                Facebook Login Click <a href={facebookLink}>Here</a>
            </div>
            <h1>PSU PASSPORT</h1>
            <div>
                <form onSubmit={loginPSU}>
                    Username: <input type="text" name="username" placeholder="Put Usename" /> <br />
                    PassWord: <input type="password" name="password" placeholder="Put Password" /> <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default LoginForm;