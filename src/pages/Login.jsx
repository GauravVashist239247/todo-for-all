import React from 'react'
import { useState } from 'react';
import { loginUser } from '../services/authService';

function TodoLogin() {
    const [formData, setFormData] = useState({ email: '', name: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(formData);
        if (result.success) {
            localStorage.setItem('token', result.token);
            setMessage('Login successful');
        } else {
            setMessage('Error: ' + result.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <br /><br />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br /><br />
                <button type="submit">Login</button>
            </form>

            {message && <p style={{ marginTop: '15px', color: 'red' }}>{message}</p>}
        </div>
    );
}




export default TodoLogin