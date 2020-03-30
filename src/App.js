import React, { Component, useState, useEffect } from 'react'
import StudentCard from './components/StudentCard'
import StudentList from './components/StudentList'
import InputForm from './components/InputForm'
import { useSelector, useDispatch, Provider } from 'react-redux'
import LoginForm from './components/LoginForm'
import { store } from './redux/store'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { AuthActions } from './redux/store'
import { bindActionCreators } from 'redux';
import './App.css'



axios.defaults.withCredentials = true



// App เป็นส่วนหลักในการไปยังหน้าต่าง ๆ 

const App = () => {

  const [loading, setLoading] = useState(false)
  const auth = useSelector(state => state.Auth);
  const actions = bindActionCreators(AuthActions, useDispatch())

  useEffect(() => {

    actions.getLoginStatus().then(res => setLoading(false))

  }, []);

  if (loading) {
    return "Loading ..."
  }
  if (!auth.accessToken && !auth.psuInfo) {

    return (

      <div>
        <LoginForm />
      </div>

    )
  }
  return (

    <div>
      <StudentList />
      <InputForm />
      <div className="Button3">
        <button className="Display" onClick={() => actions.logout()}>Log Out!!</button>
      </div>
    </div>

  )
}

export default App;