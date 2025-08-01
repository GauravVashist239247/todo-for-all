const API_URL = 'https://ecom-41u7.onrender.com/todo';

export const registerUser = async ({ email, name, password }) => {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, name, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return { success: true, ...data };
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const loginUser = async ({ email, name, password }) => {
    try {
        const res = await fetch(`https://ecom-41u7.onrender.com/todo/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, name, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        console.log(data);
        return { success: true, ...data };
    } catch (err) {
        return { success: false, message: err.message };
    }
};
