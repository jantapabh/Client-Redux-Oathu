import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import {BrowserRouter , Router, Switch, Link} from 'react-router-dom';
import StudentList from './components/StudentList'
import InputForm from './components/InputForm';
import LoginForm from './components/LoginForm'


const routing = (
  
        <div>
            <App />
        </div>
 
)

ReactDOM.render(
    routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();