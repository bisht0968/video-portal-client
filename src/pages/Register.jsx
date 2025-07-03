import React, { useContext, useState } from 'react';
import './Register.scss';
import { AppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';;
const Register = () => {

    const navigate = useNavigate();

    const { registerUser } = useContext(AppContext);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(formData, navigate);
    };

    return (
        <div className='registerSection'>
            <div className="registerContainer">
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputGroup">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputGroup">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    );
};

export default Register;
