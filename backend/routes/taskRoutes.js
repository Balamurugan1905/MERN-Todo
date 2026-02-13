import { Router } from 'express';
import Task from '../models/Task.js';

// 1. CREATE (POST)
const router = Router();

router.post('/', async (req, res) => {
    try {
        // req.body MUST contain { "title": "Your text" }
        const newTask = new Task({
            title: req.body.title,
            completed: req.body.completed || false
        });
        
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. READ (GET)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. UPDATE (PUT) - Update completion status
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. DELETE (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json("Task deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;