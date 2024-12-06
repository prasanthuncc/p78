import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const syncAuthState = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', syncAuthState);

        return () => {
            window.removeEventListener('storage', syncAuthState);
        };
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
