import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const { AppContext } = require('../context/AuthContext');
const Navbar = () => {

    const { isAuthenticated, logout } = useContext(AppContext);

    return (
        <nav>
            <ul>
                <div className="logo">
                    AYVID
                </div>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/videos">Videos</Link></li>
                <li><Link to={isAuthenticated ? '/dashboard' : '/login'}>Dashboard</Link></li>

            </ul>
            {isAuthenticated ? (
                <ul className="navbarUser">
                    <li><Link to="/login" onClick={logout}>Logout</Link></li>
                </ul>
            ) : (
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li className="navbarRegister"><Link to="/register">Get Started</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
