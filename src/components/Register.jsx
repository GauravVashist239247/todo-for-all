import React, { useState } from 'react';
import { registerUser } from '../services/authService';

function TodoRegister() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(formData);
        if (result.success) {
            setMessage('Registration successful');
        } else {
            setMessage('Error: ' + result.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /><br /><br />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br /><br />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default TodoRegister;
