import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editId, setEditId] = useState(null);

    const loadTasks = () => {
        axios.get("http://localhost:5000/tasks")
            .then(res => setTasks(res.data));
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const saveTask = async () => {

        if (title.trim() === "") return;

        if (editId) {

            await axios.put(
                `http://localhost:5000/tasks/${editId}`,
                { title }
            );

            setEditId(null);

        } else {

            await axios.post(
                "http://localhost:5000/tasks",
                { title }
            );

        }

        setTitle("");

        loadTasks();

    };

    const deleteTask = async (id) => {

        await axios.delete(`http://localhost:5000/tasks/${id}`);

        loadTasks();

    };

    const editTask = (task) => {

        setTitle(task.title);

        setEditId(task._id);

    };

    return (

        <div style={{ width: "500px", margin: "40px auto" }}>

            <h1>Task Manager</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Task"
            />

            <button onClick={saveTask}>
                {editId ? "Update" : "Add"}
            </button>

            <hr />

            {

                tasks.map(task => (

                    <div key={task._id}>

                        {task.title}

                        <button
                            onClick={() => editTask(task)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default App;