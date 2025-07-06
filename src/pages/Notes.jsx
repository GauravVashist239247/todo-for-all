import React, { useEffect, useState } from 'react';
import deleteIcon from '../assets/delete.png';

function Notes() {
    const [noteForm, setNoteForm] = useState({
        title: '',
        content: ''
    });

    const [notes, setNotes] = useState([]);

    const handleNoteChange = (e) => {
        setNoteForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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

    const handleDeleteNotes = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
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

            alert('Note deleted successfully!');
            fetchNotes();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Something went wrong while deleting.');
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

    useEffect(() => {
        fetchNotes();
        const interval = setInterval(() => {
            // Refresh interval logic (if needed)
        }, 1000);
        return () => clearInterval(interval);
    });

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Notes</h2>
            <p>Total notes: {notes.length}</p>

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
                                    <img id='icon' src={deleteIcon} alt="" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notes available.</p>
            )}
        </div>
    );
}

export default Notes;
