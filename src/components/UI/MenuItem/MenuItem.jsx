import React, { useState, useEffect, useRef } from "react";
import MyButton from "../MyButton/MyButton";
import MyInput from "../MyInput/MyInput";
import classes from "./MenuItem.module.css";

const MenuItem = ({ create, setFilter }) => {
  const [title, setTitle] = useState("");
  const focus = useRef(null);

  useEffect(() => {
    if (focus.current) {
      focus.current.focus();
    }
  }, []);

  const addNewTask = (e) => {
    if (title === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      id: Math.random(),
      title,
      completed: false,
    };
    create(newTask);
    setTitle("");
  };

  return (
    <div className={classes.MenuItem}>
      <div>
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter a task"
          ref={focus}
        ></MyInput>
        <MyButton onClick={addNewTask}>Add task</MyButton>
      </div>
      <div className={classes.BtnGroup}>
        <MyButton onClick={() => setFilter("all")}>All</MyButton>
        <MyButton onClick={() => setFilter("active")}>Active</MyButton>
        <MyButton onClick={() => setFilter("completed")}>Completed</MyButton>
      </div>
    </div>
  );
};

export default MenuItem;
