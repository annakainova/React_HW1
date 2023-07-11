import React, { useState, useEffect, useRef, useContext } from "react";
import MyButton from "../MyButton/MyButton";
import MyInput from "../MyInput/MyInput";
import MySelect from "../Select/MySelect";
import classes from "./MenuItem.module.css";
import { ThemeContext } from "../../../context";

const MenuItem = ({
  create,
  setFilter,
  selectedSort,
  changeSort,
  defaultValue,
  options,
  setTheme,
}) => {
  const [title, setTitle] = useState("");
  const focus = useRef(null);
  const theme = useContext(ThemeContext);

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

  const classNameButton = "button-" + theme;

  return (
    <div>
      <div>
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter a task"
          ref={focus}
        ></MyInput>
        <MyButton className={classNameButton} onClick={addNewTask}>
          Add task
        </MyButton>
      </div>
      <div className={classes.BtnGroup_className}>
        <MyButton className={classNameButton} onClick={() => setFilter("all")}>
          All
        </MyButton>
        <MyButton
          className={classNameButton}
          onClick={() => setFilter("active")}
        >
          Active
        </MyButton>
        <MyButton
          className={classNameButton}
          onClick={() => setFilter("completed")}
        >
          Completed
        </MyButton>
      </div>
      <div>
        <MySelect
          value={selectedSort}
          onChange={changeSort}
          defaultValue={defaultValue}
          options={options}
        />
        <div>
          <label className={classes.myLabel}>
            <MyInput
              className={classes.myLabel}
              type="checkbox"
              checked={theme === "dark"}
              onChange={(e) => {
                setTheme(e.target.checked ? "dark" : "light");
              }}
            ></MyInput>
            Use dark mode
          </label>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
