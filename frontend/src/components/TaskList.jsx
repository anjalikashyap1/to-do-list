
import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    const [filter, setFilter] = useState('All');

    // Filter tasks based on the selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'Completed') return task.status === true;
        if (filter === 'Incomplete') return task.status === false;
        return true; // 'All' shows all tasks
    });

    return (
        <div>
            <div>
                <label>Filter: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
            </div>

            {/* Task List Container with Scrollbar */}
            <div
                style={{
                    maxHeight: '300px', // Fixed height for the task list
                    overflowY: 'auto',  // Enables vertical scrolling
                    border: '1px solid #ddd', 
                    padding: '10px',
                    marginTop: '10px'
                }}
            >
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {filteredTasks.map(task => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;
