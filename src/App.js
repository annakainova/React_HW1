import React, { useState } from "react";
import TaskList from "./components/UI/TaskList/TaskList";
import MenuItem from "./components/UI/MenuItem/MenuItem";
import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const changeTaskState = (task) => {
    const updTask = tasks.map((t) =>
      task.id === t.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updTask);
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div>
        <MenuItem create={createTask}></MenuItem>
      </div>
      <div>
        <TaskList
          tasks={tasks}
          remove={removeTask}
          changeState={changeTaskState}
        ></TaskList>
      </div>
    </div>
  );
}

export default App;
