import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = (newTask) => {
    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => setTasks([...tasks, data]));
  };

  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    const updatedTask = { ...task, completed: !task.completed };

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updatedTask.completed }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(tasks.map((t) => (t.id === id ? data : t)));
      });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
