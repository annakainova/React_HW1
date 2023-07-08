import React from "react";
import classes from "./MySelect.module.css";

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <div className={classes.MySelect}>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="" disabled>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;