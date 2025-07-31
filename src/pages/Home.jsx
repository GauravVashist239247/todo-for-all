import React, { useEffect, useState } from 'react';

const Home = () => {
    const [user, setUser] = useState(null); // state to store user info

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('https://ecom-41u7.onrender.com/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await res.json();

                if (res.ok) {
                    setUser(data.user); // update state with user data
                } else {
                    console.log('User not logged in');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {user ? (
                <div>
                    <h2>User Info:</h2>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading user info or not logged in.</p>
            )}
        </div>
    );
};

export default Home;
