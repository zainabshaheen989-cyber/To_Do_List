import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [reminder, setReminder] = useState("");

  // Fetch tasks from backend on start
  useEffect(() => {
    fetch("http://10.0.2.2:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.log(err));
  }, []);

  // Add Task
  const addTask = () => {
    const trimmedTask = task.trim();
    const trimmedReminder = reminder.trim();

    if (trimmedTask === "") return;

    const newTask = {
      text: trimmedTask,
      reminder: trimmedReminder || null,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
    setReminder("");

    // Backend
    fetch("http://10.0.2.2:3000/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.log(err));
  };

  // Delete Task
  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Title */}
      <Text style={styles.title}>My To-Do List</Text>
      <Text style={styles.subtitle}>📌 Stay organized and never forget your tasks!</Text>

      {/* Task Input */}
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        placeholderTextColor="#999"
        value={task}
        onChangeText={setTask}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />

      {/* Reminder Input */}
      <TextInput
        style={styles.input}
        placeholder="Set reminder (HH:MM)"
        placeholderTextColor="#999"
        value={reminder}
        onChangeText={setReminder}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />

      {/* Add Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={addTask}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Task List */}
      <FlatList
        style={{ marginTop: 25, width: "100%" }}
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          // Left color line for each task
          const colors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6A4C93", "#FF7F50"];
          const color = colors[index % colors.length]; // repeat colors if more tasks

          return (
            <View style={styles.taskItem}>
              <View style={[styles.colorBar, { backgroundColor: color }]} />

              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={styles.taskText}>{item.text}</Text>
                {item.reminder && (
                  <Text style={styles.reminderText}>⏰ {item.reminder}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                activeOpacity={0.7}
                onPress={() => removeTask(index)}
              >
                <Text style={styles.deleteButtonText}>❌</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#28a745",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  colorBar: {
    width: 5,
    borderRadius: 3,
    marginRight: 10,
  },
  taskText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  reminderText: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
