import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim() === '') return;
        setTodos(prev => [...prev, input]);
        setInput('');
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter todo"
            />
            <button onClick={handleAdd}>Add Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
