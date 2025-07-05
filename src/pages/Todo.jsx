import React, { useEffect, useState } from 'react';

function Todo() {
    const [formData, setFormData] = useState({
        task: '',
        duedate: ''
    });

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Fetch todos from backend
    const fetchTodos = () => {
        fetch("https://ecom-41u7.onrender.com/todo/todos")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(result => {
                console.log("Fetched result:", result);

                if (Array.isArray(result)) {
                    setData(result);
                } else if (result && Array.isArray(result.data)) {
                    setData(result.data);
                } else if (Array.isArray(result[0])) {
                    setData(result[0]);
                } else {
                    throw new Error("Unexpected data format");
                }
            })
            .catch(err => {
                console.error("Error fetching todos:", err);
                setError(err.message);
            });
    };

    // Load todos on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://ecom-41u7.onrender.com/todo/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                alert('Todo add failed: ' + (result.message || response.statusText));
                return;
            }

            alert('Todo added successfully!');
            setFormData({ task: '', duedate: '' });
            fetchTodos(); // Refresh the list
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h1>Todo App</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="task"
                    placeholder="Todo Task"
                    value={formData.task}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
                />
                <input
                    type="date"
                    name="duedate"
                    value={formData.duedate}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', width: '100%' }}>
                    Add Todo
                </button>
            </form>

            <div>
                <h2>All Tasks</h2>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <p>Total tasks: {Array.isArray(data) ? data.length : 0}</p>

                {Array.isArray(data) && data.length > 0 ? (
                    <ul>
                        {data.map((todo, index) => (
                            <li key={todo?._id || index}>
                                <strong>{todo?.task || 'Untitled'}</strong> — {todo?.duedate || 'No date'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No todos available.</p>
                )}
            </div>

            {/* Optional: Debug raw response */}
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
    );
}

export default Todo;
