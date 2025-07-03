import React, { useContext } from 'react'

import './Login.scss';
import { AppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const { loginUser } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        loginUser(formData, navigate);
    };

    return (
        <div className='loginSection'>
            <div className="loginContainer">
                <h1>Login to Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <input type="email" id="email" name="email"
                            placeholder='Enter your email' required />
                    </div>
                    <div className="inputGroup">
                        <input type="password" id="password" name="password" placeholder='*********' required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </div>
    )
}

export default Login
