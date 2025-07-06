import React, { useEffect, useState } from 'react';
import './Todo.css';
import deleteIcon from '../assets/delete.png';

function Todo() {
    const [formData, setFormData] = useState({
        name: '',
        task: '',
        duedate: ''
    });

    const [noteForm, setNoteForm] = useState({
        title: '',
        content: ''
    });

    const [data, setData] = useState([]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleNoteChange = (e) => {
        setNoteForm(prev => ({
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

    const fetchNotes = () => {
        fetch("https://ecom-41u7.onrender.com/todo/notes")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch notes");
                return res.json();
            })
            .then(result => {
                if (Array.isArray(result)) {
                    setNotes(result);
                } else if (result && Array.isArray(result.data)) {
                    setNotes(result.data);
                } else {
                    throw new Error("Unexpected notes format");
                }
            })
            .catch(err => {
                console.error("Error fetching notes:", err);
            });
    };
    useEffect(() => {
        fetchTodos();
        fetchNotes()
        const interval = setInterval(() => {

        }, 1000);

        return () => clearInterval(interval);


    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://ecom-41u7.onrender.com/todo/deletetodo/${id}`, {
                method: 'DELETE',
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

    const handleDeleteNotes = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://ecom-41u7.onrender.com/todo/notes/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (!response.ok) {
                alert('Delete failed: ' + (result.message || response.statusText));
                return;
            }

            alert('notes deleted successfully!');
            fetchNotes();
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
                body: JSON.stringify(formData),
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

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://ecom-41u7.onrender.com/todo/note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noteForm)
            });

            const result = await res.json();
            if (!res.ok) {
                alert("Failed to add note: " + (result.message || res.statusText));
                return;
            }

            alert("Note added successfully!");
            setNoteForm({ title: '', content: '' });
            fetchNotes();
        } catch (err) {
            console.error("Note upload error:", err);
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
                    <ul>
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
                                <li key={todo?._id || index} style={{ marginBottom: '15px' }}>
                                    <strong>Name: {todo.name}</strong>
                                    <div>
                                        <p>Task: {todo?.task || 'Untitled'}</p>
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
                                                <img id='icon' src={deleteIcon}
                                                    alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>No todos available.</p>
                )}
            </div>

            <hr style={{ margin: '40px 0' }} />

            <div>
                <h2>Notes</h2>

                <form onSubmit={handleNoteSubmit} style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Note Title"
                        value={noteForm.title}
                        onChange={handleNoteChange}
                        required
                        style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
                    />
                    <textarea
                        name="content"
                        placeholder="Note Content"
                        value={noteForm.content}
                        onChange={handleNoteChange}
                        required
                        rows="4"
                        style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
                    />
                    <button type="submit" style={{ padding: '10px', width: '100%' }}>
                        Add Note
                    </button>
                </form>

                {notes.length > 0 ? (
                    <ul>
                        {notes.map((note, index) => (
                            <li key={note?._id || index} style={{ marginBottom: '20px' }}>
                                <h4>{note.title}</h4>
                                <p>{note.content}</p>
                                <div className='but-div'>
                                    <button
                                        id='but'
                                        onClick={() => handleDeleteNotes(note._id)}
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
                                        <img id='icon' src={deleteIcon}
                                            alt="" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No notes available.</p>
                )}
            </div>
        </div>
    );
}

export default Todo;
