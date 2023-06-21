import React, { useState, useEffect } from "react";
import TaskList from "./components/UI/TaskList/TaskList";
import MenuItem from "./components/UI/MenuItem/MenuItem";
import TasksService from "./components/API/TaskService";
import Loader from "./components/UI/Loader/Loader";
import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  async function fetchTasks() {
    setIsTaskLoading(true);
    setTimeout(async () => {
      const tasks = await TasksService.getTasks();
      setTasks(tasks);
      setIsTaskLoading(false);
    }, 1000);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

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
        {isTaskLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Loader></Loader>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            remove={removeTask}
            changeState={changeTaskState}
          ></TaskList>
        )}
      </div>
    </div>
  );
}

export default App;
