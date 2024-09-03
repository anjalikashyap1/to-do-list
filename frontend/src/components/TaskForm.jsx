
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setError('Task name is required.');
            return;
        }

        addTask({ name, description });
        setName('');
        setDescription('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Task name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className='addbutton'>Add Task</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default TaskForm;
