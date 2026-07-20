const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
    await client.connect();
    return client.db("taskmanager").collection("tasks");
}

app.get("/", (req, res) => {
    res.send("Task Manager Backend Running");
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
    const tasks = await connectDB();
    const result = await tasks.find().toArray();
    res.json(result);
});

// Add Task
app.post("/tasks", async (req, res) => {
    const tasks = await connectDB();

    const newTask = {
        title: req.body.title,
        completed: false
    };

    await tasks.insertOne(newTask);

    res.json({ message: "Task Added" });
});

// Update Task
app.put("/tasks/:id", async (req, res) => {

    const tasks = await connectDB();

    await tasks.updateOne(
        { _id: new ObjectId(req.params.id) },
        {
            $set: {
                title: req.body.title
            }
        }
    );

    res.json({ message: "Task Updated" });

});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {

    const tasks = await connectDB();

    await tasks.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.json({ message: "Task Deleted" });

});

app.listen(process.env.PORT || 5000, () => {

    console.log("Server Running");

});