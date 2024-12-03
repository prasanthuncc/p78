import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ isTokenAuthenticate, setIsTokenAuthenticate }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsTokenAuthenticate(false); // Update state in parent to hide logout button
    };

    return (
        <header className='header'>
            <nav className='navbar'>
                <a href="/" className='logo'>Gen AI 2024</a>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/summary">Summary</Link>
                    </li>
                    <li>
                        <Link to="/report">Report</Link>
                    </li>
                    {/* Only show logout button if authenticated */}
                    {isTokenAuthenticate && (
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
