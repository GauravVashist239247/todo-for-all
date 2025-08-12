import React, { useEffect, useState } from 'react';
import './Todo.css';
import deleteIcon from '../assets/delete.png';

function Todo() {
    const [formData, setFormData] = useState({
        name: '',
        task: '',
        duedate: ''
    });

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const fetchTodos = () => {
        fetch("https://ecom-41u7.onrender.com/todo/todos")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(result => {
                if (Array.isArray(result)) {
                    setData(result);
                } else if (result && Array.isArray(result.data)) {
                    setData(result.data);
                } else if (Array.isArray(result[0])) {
                    setData(result[0]);
                } else {
                    throw new Error("Unexpected data format");
                }
                console.log(data)
            })
            .catch(err => {
                console.error("Error fetching todos:", err);
                setError(err.message);
            });
    };



    //useEffect code for gmail of user
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
                    console.log(data)
                } else {
                    console.log('User not logged in');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);




    useEffect(() => {
        fetchTodos();
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://ecom-41u7.onrender.com/todo/deletetodo/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const result = await response.json();

            if (!response.ok) {
                alert('Delete failed: ' + (result.message || response.statusText));
                return;
            }

            alert('Todo deleted successfully!');
            fetchTodos();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Something went wrong while deleting.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://ecom-41u7.onrender.com/todo/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, isCompleted: false, createdby: user.email }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert('Todo add failed: ' + (result.message || response.statusText));
                return;
            }

            alert('Todo added successfully!');
            setFormData({ name: '', task: '', duedate: '' });
            fetchTodos();
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong.');
        }
    };

    const handleToggleComplete = async (todo) => {
        try {
            const response = await fetch(`https://ecom-41u7.onrender.com/todo/updatetodo/${todo._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted, createdby: user.email }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert('updation failed: ' + (result.message || response.statusText));
                return;
            }
            fetchTodos();
        } catch (err) {
            console.error("Toggle complete error:", err);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Todo App</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
                />
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
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {data.map((todo, index) => {
                            const readableDate = todo?.duedate
                                ? new Date(todo.duedate).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                                : 'No date';

                            return (
                                <li
                                    key={todo?._id || index}
                                    style={{
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        backgroundColor: todo?.isCompleted ? '#d3ffd3' : '#fff',
                                        opacity: todo?.isCompleted ? 0.6 : 1,
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                        <strong>Name:{todo.name}</strong>

                                        <input
                                            id='checkbox'
                                            type="checkbox"
                                            checked={todo?.isCompleted}
                                            onChange={() => handleToggleComplete(todo)}
                                            style={{ marginRight: '10px' }}
                                        />
                                    </div>
                                    <strong>email:{todo.createdby}</strong>
                                    <p style={{ backgroundColor: "red" }}>Task: {todo?.task || 'Untitled'}</p>
                                    <p>Due: {readableDate}</p>
                                    <div className='but-div'>
                                        <button
                                            id='but'
                                            onClick={() => handleDelete(todo._id)}
                                            style={{
                                                marginLeft: '10px',
                                                padding: '5px 10px',
                                                backgroundColor: '#ff758f',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '33px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete
                                            <img id='icon' src={deleteIcon} alt="" />
                                        </button>
                                    </div>
                                    <hr style={{ margin: '40px 0' }} />
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>No todos available.</p>
                )}
            </div>

        </div>
    );
}

export default Todo;
