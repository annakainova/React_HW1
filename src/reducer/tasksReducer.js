export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [...tasks, action.newTask];
    }
    case "changed": {
      return tasks.map((t) =>
        action.task.id === t.id ? { ...t, completed: !t.completed } : t
      );
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.task.id);
    }
    case "sorted": {
      action.setSelectedSort(action.sort);
      if (action.sort === "title") {
        return [...tasks].sort((a, b) =>
          a[action.sort].localeCompare(b[action.sort])
        );
      } else {
        return [...tasks].sort((a, b) =>
          a[action.sort] > b[action.sort] ? 1 : -1
        );
      }
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
