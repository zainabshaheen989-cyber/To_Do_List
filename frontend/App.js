import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on start
  useEffect(() => {
    fetch("http://10.0.2.2:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.log(err));
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;

    fetch("http://10.0.2.2:3000/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setTask("");
      })
      .catch((err) => console.log(err));
  };

  const removeTask = (index) => {
    fetch("http://10.0.2.2:3000/deleteTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a task..."
        value={task}
        onChangeText={setTask}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        style={{ marginTop: 20, width: "100%" }}
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>• {item}</Text>
            <Button title="❌" onPress={() => removeTask(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
  },
});
