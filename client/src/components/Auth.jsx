import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import ConversaIcon from '../assets/conversa.png'

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div>
            <div className="h-100 gradient-form" id="auth__page">
                <Container className="py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <Card className="rounded-3 text-black">
                            <Row className="g-0">
                                <div className="col-lg-6">
                                <Card.Body className="p-md-5 mx-md-4">
                                    <div className='text-center'>
                                        <Image src={ConversaIcon} fluid />
                                        <h4 class="mt-1 mb-5 pb-1">{isSignup ? 'Sign Up Page' : 'Sign In Page'}</h4>
                                    </div>
                                    <Form onSubmit={handleSubmit}>
                                    {isSignup && (
                                        <Form.Group className="mb-3" controlId="fullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control 
                                            name="fullName" 
                                            type="text" 
                                            placeholder="Enter your Name" 
                                            onChange={handleChange} 
                                            required/>
                                        </Form.Group>
                                    )}
                                    
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                            name="username" 
                                            type="text" 
                                            placeholder="Username" 
                                            onChange={handleChange} 
                                            required/>
                                    </Form.Group>

                                    {isSignup && ( 
                                        <Form.Group className="mb-3" controlId="phoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control 
                                            name="phoneNumber" 
                                            type="text"
                                            placeholder="Phone Number"
                                            onChange={handleChange}
                                            required/>
                                        <Form.Text className="text-muted">
                                        We'll never share your phone Number with anyone else.
                                        </Form.Text>
                                        </Form.Group>
                                    )}

                                    {isSignup && ( 
                                        <Form.Group className="mb-3" controlId="avatarURL">
                                            <Form.Label>Your Profile URL</Form.Label>
                                            <Form.Control 
                                                name="avatarURL" 
                                                type="text"
                                                placeholder="Your Profile URL"
                                                onChange={handleChange}
                                                required/>
                                        </Form.Group>
                                    )}

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            name="password" 
                                            type="password"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            required/>
                                    </Form.Group>
                                    
                                    {isSignup && ( 
                                        <Form.Group className="mb-3" controlId="confirmPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control name="confirmPassword" 
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    onChange={handleChange}
                                                    required/>
                                        </Form.Group>
                                    )}

                                    <Button variant="primary" type="submit">
                                        {isSignup ? "Sign Up" : "Sign In"}
                                    </Button>
                                    </Form>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <p className="fs-6">
                                                {isSignup
                                                ? "Already have an account?" 
                                                : "Don't have an account?"
                                                }
                                                &nbsp; &nbsp;
                                                <Button onClick={switchMode} variant="dark" size="sm"> 
                                                    {isSignup ? 'Sign In' : 'Sign Up'} 
                                                </Button>
                                            </p>
                                        </div>
                                    </div>

                                </Card.Body>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center" id="auth__page_div">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h5 className="mb-4" id="auth__page_text">Welcome to Conversa, the ultimate chat application designed to connect and engage with friends, 
                                            family, and colleagues. With Conversa, you can enjoy seamless conversations in real-time.</h5>
                                        <p className="small" id="auth__page_text">Experience a user-friendly interface that allows you to chat effortlessly 
                                            across various platforms, whether it's through individual messages or group discussions. 
                                            Stay connected and up-to-date with the people who matter most to you, sharing messages and photos. <br/>
                                            Conversa offers a range of features to enhance your chatting experience. Take advantage of our rich collection 
                                            of emojis and stickers to express your emotions in a fun and creative way. Conversa is here to facilitate smooth
                                            and enjoyable communication. Join our vibrant community and unlock the power of conversation today.
                                        </p>
                                        <h6 id="auth__page_text">Sign up now and experience the joy of connecting through Conversa, where meaningful conversations come to life."</h6>
                                    </div>
                                </div>
                            </Row>
                        </Card>
                    </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Auth