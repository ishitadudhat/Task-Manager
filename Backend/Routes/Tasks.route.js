const express = require('express');
const router = express.Router();

const Task = require('../Models/Task.model');

//Get route
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//Get route by Id
router.get('/:id', async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message: "Task Not Found"});
        res.json(task);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Put route - new task
router.post('/', async (req, res)=>{
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Put route by Id - Update Task
router.put('/:id', async (req, res)=> {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.is, req.body, {new: true});
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//Delete route by Id - Delete Task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: "Task Deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;