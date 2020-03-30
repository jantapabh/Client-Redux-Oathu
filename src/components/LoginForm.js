import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StudentList from './StudentList'
import InputForm from './InputForm'
import FacebookLogin from 'react-facebook-login';
import './LoginForm.css';


import { AuthActions } from '../redux/store';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Button, Form, Card } from 'react-bootstrap';


const LoginForm = (props) => {

   
    const actions = bindActionCreators({ ...AuthActions }, useDispatch())
    const [facebookLink, setFacebookLink] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getFacebookLink = async () => {

        const res = await axios.get(`http://localhost/api/auth/facebook`);
        setFacebookLink(res.data);
    }

    useEffect(() => {
        getFacebookLink()
    }, []);

    const loginPSU = (e) => {

        e.preventDefault();
        actions.loginPSU(username.value, password.value)
    }
    return (
        <div   className="M">
            <div>
            <h1 className="h1">LOGIN FORM</h1>
                <div>
                    <br />
                    <br />
                    <div className="last">
                        <Card style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card.Body>
                                <Card.Title className="topic">Facebook LOGIN</Card.Title>
                                <br />
                                <br />
                        
                                <Button href={facebookLink}>LOGIN</Button>
                                <br />
                                <br />
                            </Card.Body>
                        </Card>
                        </div>
                    {' '}
                    <div>
                        <div>
                            <form>
                                <div>
                                    <div>
                                        <div className="last">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title className="topic">PSU LOGIN</Card.Title>
                                                    <Card.Text>
                                                        <Form>
                                                            <Form.Group controlId="formBasicEmail">
                                                                <Form.Label>Username</Form.Label>
                                                                <br />
                                                                <Form.Control type="text" placeholder="Put Username" name="username" onChange={(e)=>setUsername(e.target.value)}/>
                                                            </Form.Group>
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <br />
                                                                <Form.Control type="password" placeholder="Put Password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                                                            </Form.Group>
                                                        </Form>
                                                    </Card.Text>
                                                    <Button variant="outline-primary" onClick={loginPSU}>LOGIN</Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )

}
export default LoginForm;