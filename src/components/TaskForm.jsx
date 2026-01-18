import { useState, useContext, useId } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);
  const id = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask({
        text: text,
        completed: false,
      });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id}>Add Task:</label>
      <input
        id={id}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
