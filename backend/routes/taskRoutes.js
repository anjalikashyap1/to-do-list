// backend/routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new task
router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.name = req.body.name || task.name;
        task.description = req.body.description || task.description;
        task.status = req.body.status != null ? req.body.status : task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE task
router.delete('/:id', async (req, res) => {
    try {
      console.log(`Received request to delete task with id: ${req.params.id}`);
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        console.error(`Task with id ${req.params.id} not found`);
        return res.status(404).json({ message: 'Task not found' });
      }
  
      await task.deleteOne();  // Use deleteOne instead of remove
      res.json({ message: 'Task deleted' });
    } catch (err) {
      console.error(`Error deleting task with id ${req.params.id}:`, err);
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;
