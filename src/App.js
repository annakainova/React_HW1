import React, { useState, useEffect, useMemo, useReducer } from "react";
import TaskList from "./components/UI/TaskList/TaskList";
import MenuItem from "./components/UI/MenuItem/MenuItem";
import Loader from "./components/UI/Loader/Loader";
import "./styles/App.css";
import { ThemeContext } from "./context";
import { useData } from "./hooks/useData";
import { tasksReducer } from "./reducer/tasksReducer";

function App() {
  const [filter, setFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("");
  const [theme, setTheme] = useState("light");
  const [tasksData, isLoading, taskError] = useData(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const [tasks, dispatch] = useReducer(tasksReducer, tasksData);

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

  function handleAddTask(newTask) {
    dispatch({
      type: "added",
      newTask: newTask,
    });
  }

  function handleDeleteTask(task) {
    dispatch({
      type: "deleted",
      task: task,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleSortTask(sort) {
    dispatch({
      type: "sorted",
      sort: sort,
      setSelectedSort: setSelectedSort,
    });
  }

  const classNameDiv = "div-" + theme;
  return (
    <ThemeContext.Provider value={theme}>
      <div className={classNameDiv}>
        <h1>ToDo List</h1>
        <div>
          <MenuItem
            create={handleAddTask}
            setFilter={setFilter}
            value={selectedSort}
            changeSort={handleSortTask}
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
            <div className={classNameDiv}>
              <TaskList
                tasks={visibleTasks}
                remove={handleDeleteTask}
                changeState={handleChangeTask}
              ></TaskList>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
