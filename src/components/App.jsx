import { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";
import { TaskContext } from "../context/TaskContext";

function App() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm />
      <SearchBar />
      <TaskList />
    </div>
  );
}

export default App;
