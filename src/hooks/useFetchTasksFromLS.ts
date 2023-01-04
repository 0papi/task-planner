import { useState } from "react";
import { useEffect } from "react";
import { ITasks } from "../types";
const useFetchTasksFromLs = () => {
  const [tasks, setTasks] = useState<ITasks>();
  useEffect(() => {
    const taskList = JSON.parse(localStorage.getItem("tasksList")!);

    if (taskList) {
      setTasks(taskList);
    }
  }, []);

  return {
    tasks,
  };
};

export default useFetchTasksFromLs;
