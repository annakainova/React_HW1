import React, { useState, useEffect, useMemo } from "react";
import TaskList from "./components/UI/TaskList/TaskList";
import MenuItem from "./components/UI/MenuItem/MenuItem";
import Loader from "./components/UI/Loader/Loader";
import "./styles/App.css";
import TasksService from "./API/TaskService";
import { ThemeContext } from "./context";
import { useData } from "./hooks/useData";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("");
  const [theme, setTheme] = useState("light");
  const [fetchTasks, isLoading, taskError] = useData(async () => {
    const data = await TasksService.getTasks(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setTasks(data);
  });

  const sortTasks = (sort) => {
    setSelectedSort(sort);
    if (sort === "title") {
      setTasks([...tasks].sort((a, b) => a[sort].localeCompare(b[sort])));
    } else {
      setTasks([...tasks].sort((a, b) => (a[sort] > b[sort] ? 1 : -1)));
    }
  };

  const visibleTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter]
  );

  function filterTasks(tasks, filter) {
    return tasks.filter((task) => {
      if (filter === "active") {
        return !task.completed;
      } else if (filter === "completed") {
        return task.completed;
      } else {
        return true;
      }
    });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tasks),
    };
    try {
      fetch("https://reqres.in/api/posts", requestOptions).then((response) =>
        response.json()
      );
    } catch (e) {}
  }, [tasks]);

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
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <h1>ToDo List</h1>
        <div>
          <MenuItem
            create={createTask}
            setFilter={setFilter}
            value={selectedSort}
            changeSort={sortTasks}
            defaultValue="Сортировка"
            options={[
              { value: "title", name: "По имени" },
              { value: "completed", name: "По статусу" },
            ]}
            setTheme={setTheme}
          ></MenuItem>
        </div>
        <div>
          {taskError && <h1> Произошла ошибка ${taskError}</h1>}
          {isLoading ? (
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
            <div>
              <TaskList
                tasks={visibleTasks}
                remove={removeTask}
                changeState={changeTaskState}
              ></TaskList>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
