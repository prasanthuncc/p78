import React from 'react';
import {Link} from 'react-router-dom';
import './Menu.css';
import {useAuth} from '../context/AuthContext';

const Menu = () => {

    const {isAuthenticated, logout} = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <header className='header'>
            <nav className='navbar'>
                <a href="/" className='logo'>Gen AI 2024</a>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/summary">Summary</Link>
                    </li>
                    <li>
                        <Link to="/report">Report</Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Menu;
