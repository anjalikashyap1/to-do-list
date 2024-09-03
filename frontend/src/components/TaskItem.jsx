
import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleToggleStatus = () => {
        updateTask(task._id, { ...task, status: !task.status });
    };

    const handleDelete = () => {
        deleteTask(task._id);
    };

    const handleUpdate = () => {
        updateTask(task._id, { ...task, name: editedName, description: editedDescription });
        setIsEditing(false);
    };

    return (
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Task Name"
                    />
                    <input
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Task Description"
                    />
                    <button onClick={handleUpdate} >Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <input
                        type="checkbox"
                        checked={task.status}
                        onChange={handleToggleStatus}
                        style={{ marginRight: '10px' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                        <span
                            style={{
                                textDecoration: task.status ? 'line-through' : 'none',
                                marginRight: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={handleToggleStatus}
                        >
                            {task.name}
                        </span>
                        {task.description && (
                            <span
                                style={{
                                    textDecoration: task.status ? 'line-through' : 'none',
                                    color: 'gray'
                                }}
                            >
                                {task.description}
                            </span>
                        )}
                    </div>
                    <button onClick={() => setIsEditing(true)} >Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </li>
    );
};

export default TaskItem;
