import React, { useContext, useState } from 'react'

import Spinner from '../components/Spinner';

import './Login.scss';
import { AppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { loginUser } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            await loginUser(formData, navigate);
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='loginSection'>
            {loading ? (
                <Spinner text="Loading" />
            ) : (
                <div className="loginContainer">
                    <h1>Login to Your Account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="inputGroup">
                            <input type="email" id="email" name="email" placeholder='Enter your email' required />
                        </div>
                        <div className="inputGroup">
                            <input type="password" id="password" name="password" placeholder='*********' required />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <a href="/register">Register here</a></p>
                </div>
            )}
        </div>
    );
}

export default Login
