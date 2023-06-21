import React, { useState } from "react";
import MyButton from "../MyButton/MyButton";
import MyInput from "../MyInput/MyInput";
import classes from "./MenuItem.module.css"

const MenuItem = ({ create }) => {
  const [title, setTitle] = useState("");

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
      <MyInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter a task"
      ></MyInput>
      <MyButton onClick={addNewTask}>Add task</MyButton>
    </div>
  );
};

export default MenuItem;
