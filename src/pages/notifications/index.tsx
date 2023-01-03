import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { pageClasses } from "../../utils/classes";
import { useEffect, useRef, useState } from "react";
import { selectTaskList } from "../../store/taskReducer";

export default function Notifications() {
  const tasksList = useSelector(selectTaskList);
  const [notificationText, setNotificationText] = useState("");
  const prevTasksLength = useRef(tasksList.length);

  useEffect(() => {
    if (tasksList.length > prevTasksLength.current) {
      setNotificationText("New task added");
    } else if (tasksList.length < prevTasksLength.current) {
      setNotificationText("Task removed");
    }
    prevTasksLength.current = tasksList.length;
  }, [tasksList.length]);

  const numOfTasks = tasksList.length;
  const showTaskText =
    numOfTasks === 0 ? (
      <p>You have created 0 task(s) </p>
    ) : (
      <p>
        You have created {numOfTasks} {numOfTasks === 1 ? "task" : "tasks"}{" "}
      </p>
    );

  return (
    <DashboardLayout>
      <div className={`${pageClasses}`}>
        <h1 className="border-b border-b-gray-500 w-full">
          Your notifications
        </h1>
        <div className="bg-white shadow-sm w-[400px] rounded-md py-4 px-4">
          {showTaskText}
        </div>
      </div>
    </DashboardLayout>
  );
}
