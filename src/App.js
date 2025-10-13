import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import NotFound from './components/NotFound';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    // Update auth state when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: isAuthenticated ? _jsx(Home, {}) : _jsx(Navigate, { to: "/login", replace: true }) }), _jsx(Route, { path: "/login", element: isAuthenticated ? _jsx(Navigate, { to: "/", replace: true }) : _jsx(LoginPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }));
}
export default App;
