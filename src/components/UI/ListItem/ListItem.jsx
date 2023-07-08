import React, { useState, useContext } from "react";
import MyButton from "../MyButton/MyButton";
import classes from "./ListItem.module.css";
import classNames from "classnames";
import { ThemeContext } from "../../../context";

const ListItem = ({ task, remove, completed, changeState }) => {
  const [completedState, setCompletedState] = useState(completed);
  const theme = useContext(ThemeContext);

  function changeCompletedState() {
    setCompletedState(!completedState);
    changeState(task);
  }

  const className = "div-" + theme;
  const classDoneButtonName = "button-done-" + theme;
  const classDeleteButtonName = "button-delete-" + theme;

  return (
    <div className={classNames(classes.ListItem, className)}>
      <p className={completedState ? "completed" : ""}>{task.title}</p>
      <div className={classes.BtnGroup}>
        <MyButton
          className={classNames(classes.ButtonDone, classDoneButtonName)}
          onClick={() => changeCompletedState()}
        >
          Done
        </MyButton>
        <MyButton
          className={classNames(classes.ButtonDelete, classDeleteButtonName)}
          onClick={() => remove(task)}
        >
          Delete
        </MyButton>
      </div>
    </div>
  );
};

export default ListItem;
