const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:19006' }));

const db_url = 'mongodb://127.0.0.1:27017/task';
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('Task', {
    name: String,
    description: String,
    dueDate: String,
    completed: Boolean,
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // method updates the task in the database and returns the updated task.
    res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    // method deletes the task from the database.
    res.send({ message: 'Task deleted' });
});

app.listen(port, () => console.log(`API listening on port ${port}`));
