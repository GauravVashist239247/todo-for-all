import React, { useEffect, useState } from 'react';
import './navbar.css';
import todologo from '../assets/todologo.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    //this is a function t o navigate to the /login route when click on the login button
    const navigate = useNavigate()
    const handleloginclick = () => {
        navigate('/login')
    }


    return (
        <div className='nav-bar'>
            <div className="nav-left">
                <img id='logoimage' src={todologo} alt="logo" />
                <h2>Todo App</h2>
            </div>

            <div className="nav-right">
                <div className="nav-links">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/about" className="nav-link">About</NavLink>
                    <NavLink to="/github" className="nav-link">Github</NavLink>
                    <NavLink to="/backend" className="nav-link">Backend</NavLink>
                    <NavLink to="/todo" className="nav-link">Todo</NavLink>
                    <NavLink to="/notes" className="nav-link">Notes</NavLink>
                    <NavLink to="/todolist" className="nav-link">Todolist</NavLink>
                </div>

                <NavLink to="/register" className="nav-link">Register</NavLink>
                <div id='log-but'>
                    <button onClick={handleloginclick}>Login</button>
                </div>

                <span
                    id='darkmodelogo'
                    onClick={toggleDarkMode}
                    title="Toggle Dark Mode"
                    className="material-symbols-outlined"
                >
                    contrast
                </span>
            </div>
        </div>
    );
};

export default Navbar;
