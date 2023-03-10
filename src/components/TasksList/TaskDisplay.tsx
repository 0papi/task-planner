/**
 * This component will be used to display the card for each task that is created
 * It should have the following props
 * - Title of the task
 * - Content or brief description of the task
 * - A set priority icon
 * - three dots - showing additional options
 * - the date and time - showing when it was created
 */

import { useModal, Progress, useTheme, Popover } from "@geist-ui/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Edit from "../icons & svs/Edit";
import { selectTaskList } from "../../store/taskReducer";

import { ITasks } from "../../types";
import EditTaskModal from "../Modals/EditTaskModal";
import TaskActivities from "../TaskActivites/TaskActivities";
import PriorityHandler from "../PriorityHandler/PriorityHandler";

export default function TaskDisplay({
  content,
  createdAt,
  title,
  id,
  priority,
  isCompleted,
  description,
}: ITasks) {
  const task = useSelector(selectTaskList).find((task) => task.id === id);

  const { bindings, setVisible } = useModal();
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const theme = useTheme();

  const [value, setValue] = useState(task?.isCompleted ? 100 : 0);

  // this useEffect will set the value for the task completion progress so that whenever the task is marked as complete, the value will be set to 100
  // This ensure's that the progress bar updates whenever the user update's the isCompleted value
  useEffect(() => {
    if (task?.isCompleted) {
      setValue(100);
    }
  }, [task?.isCompleted]);

  // this state is used to set the ID for adding description to a particular task
  const [taskActivitiesID, setTaskActivitiesID] = useState("");

  // state for setting ID for setting task priority
  const [priorityID, setPriorityID] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  const colors = { 0: theme.palette.warning, 100: "#4daa5d" };

  // bool check if description exists
  const isDescriptionAvailable = Boolean(description);

  // description to be passed to popover
  const showDescription = <p className="max-w-lg px-2">{description}</p>;

  return (
    <div className="bg-white shadow-sm p-4 flex items-baseline gap-x-4 my-4 rounded-[8px]">
      <div className="h-[30px] w-[30px] rounded-[50%] bg-primary border border-gray-600"></div>
      {/* <div>Actions</div> */}
      <div className="flex items-start flex-col w-[100%]">
        <div className="flex items-center justify-between w-[100%]">
          <h3 className="mb-0">{title}</h3>
          <div className="flex items-center gap-x-4">
            <PriorityHandler
              id={priorityID}
              onClick={() => {
                setPriorityID(id);
                setTaskPriority(priority);
              }}
              taskPriority={taskPriority}
            />

            {/* <DatePickerComponent /> */}

            <button
              title="Edit task"
              className="bg-transparent border border-gray-300 rounded-lg p-1"
              onClick={() => {
                setTaskId(id);
                setTaskTitle(title);
                setTaskContent(content);
                setVisible(true);
              }}
            >
              <Edit />
            </button>
            <TaskActivities
              isCompleted={isCompleted}
              id={taskActivitiesID}
              onClick={() => setTaskActivitiesID(id)}
              description={description}
            />
          </div>
        </div>
        <div>
          <p className="max-w-xl mb-2">{content}</p>
          {isDescriptionAvailable && (
            <Popover
              content={showDescription}
              placement="bottomStart"
              offset={5}
            >
              <button className="underline text-primary">
                View Description
              </button>
            </Popover>
          )}
        </div>
        <div className="flex items-center gap-x-14 w-full">
          <div className="flex items-center gap-x-2 flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p>{createdAt}</p>
          </div>

          <div className="flex-1 flex items-center gap-x-4">
            <Progress value={value} colors={colors} />
            <span>{isCompleted ? "Complete" : "Incomplete"}</span>
          </div>
        </div>
      </div>

      <EditTaskModal
        bindings={bindings}
        setVisible={setVisible}
        id={taskId}
        setTaskContent={setTaskContent}
        setTaskTitle={setTaskTitle}
        taskContent={taskContent}
        taskTitle={taskTitle}
      />
    </div>
  );
}
