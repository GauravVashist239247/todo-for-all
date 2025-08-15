import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // 🔹 Clear any tokens stored in localStorage or sessionStorage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        // 🔹 Call backend to clear cookie
        fetch('https://ecom-41u7.onrender.com/todo/logout', {
            method: 'POST',
            credentials: 'include', // Ensures cookies are sent
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Logout response:', data);
                navigate('/login'); // Redirect to login after logout
            })
            .catch(err => {
                console.error('Logout error:', err);
                navigate('/login'); // Still redirect even if API fails
            });
    }, [navigate]);

    return <div>Logging out...</div>;
}

export default Logout;
