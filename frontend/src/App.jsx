// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    const addTask = (task) => {
        axios.post('http://localhost:5000/tasks', task)
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.error(err));
    };

    const updateTask = (id, updatedTask) => {
        axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
            .then(res => {
                setTasks(tasks.map(task => task._id === id ? res.data : task));
            })
            .catch(err => console.error(err));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <TaskForm addTask={addTask} />
            <div className="task-list-container">
                <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
            </div>
        </div>
    );
};

export default App;
