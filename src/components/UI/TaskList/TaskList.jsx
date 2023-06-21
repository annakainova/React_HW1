import React from "react";
import ListItem from "../ListItem/ListItem";

const TaskList = ({tasks, remove, changeState}) => {
  return (
    <div>
      {tasks.map((task) => (
        <ListItem task={task} key={task.id} completed={task.completed} remove={remove} changeState={changeState}></ListItem>
      ))}
    </div>
  );
};

export default TaskList;
