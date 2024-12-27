import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
    const location = useLocation();

    return (
        <header className="header-container">
            <div className="header-logo">
                <Link to="/">Swift AI</Link>
            </div>
            <nav className="nav-links">
                <Link 
                    to="/" 
                    className={location.pathname === '/' ? 'active' : ''}
                >
                    Home
                </Link>
                <Link 
                    to="/email" 
                    className={location.pathname === '/email' ? 'active' : ''}
                >
                    Email Campaign and Automation
                </Link>
                <Link 
                    to="/lists" 
                    className={location.pathname === '/lists' ? 'active' : ''}
                >
                   Contact Lists
                </Link>
                <Link 
                    to="/login" 
                    className={location.pathname === '/login' ? 'active' : ''}
                >
                    Login
                </Link>
                <Link 
                    to="/signup" 
                    className={location.pathname === '/signup' ? 'active' : ''}
                >
                    Signup
                </Link>
            </nav>
        </header>
    );
};

export default Header;