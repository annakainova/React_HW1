import React, { useState } from "react";
import MyButton from "../MyButton/MyButton";
import classes from "./ListItem.module.css";

const ListItem = ({ task, remove, completed, changeState }) => {
  const [completedState, setCompletedState] = useState(completed);

  function changeCompletedState() {
    setCompletedState(!completedState);
    changeState(task);
  }

  return (
    <div className={classes.ListItem}>
      <p className={completedState ? "completed" : ""}>{task.title}</p>
      <div className={classes.BtnGroup}>
        <MyButton
          className={classes.ButtonDone}
          onClick={() => changeCompletedState()}
        >
          Done
        </MyButton>
        <MyButton className={classes.ButtonDelete} onClick={() => remove(task)}>
          Delete
        </MyButton>
      </div>
    </div>
  );
};

export default ListItem;
