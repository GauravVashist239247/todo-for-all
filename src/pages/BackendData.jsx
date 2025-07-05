import React, { useEffect, useState } from 'react';

function BackendData() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://ecom-41u7.onrender.com/login/allusers", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(result => {
                console.log("Backend response:", result);
                // If response is an array in an array like: [ [ {..}, {..} ] ]
                if (Array.isArray(result) && Array.isArray(result[0])) {
                    setData(result[0]);
                } else {
                    setData(result);
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err.message);
            });
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{}}>
            <h2>All Users</h2>
            <p>Total users: {data.length}</p>
            <ul>
                {data.map((user, index) => (
                    <li key={user._id || index} >
                        <strong>{user.name}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BackendData;
