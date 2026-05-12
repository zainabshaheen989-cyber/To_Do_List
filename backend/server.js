const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let tasks = [];

// Add Task
app.post("/addTask", (req, res) => {
  const { task } = req.body;
  if (task && task.trim() !== "") {
    tasks.push(task);
  }
  res.json({ tasks });
});

// Get Tasks
app.get("/tasks", (req, res) => {
  res.json({ tasks });
});

// Delete Task
app.post("/deleteTask", (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.json({ tasks });
});

app.listen(3000, () => {
  console.log("✅ To-Do backend running at http://localhost:3000");
});