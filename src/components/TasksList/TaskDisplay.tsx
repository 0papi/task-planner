/**
 * This component will be used to display the card for each task that is created
 * It should have the following props
 * - Title of the task
 * - Content or brief description of the task
 * - A set priority icon
 * - three dots - showing additional options
 * - the date and time - showing when it was created
 */
import { useModal } from "@geist-ui/core";

import { useState } from "react";

import Edit from "../icons & svs/Edit";

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
}: ITasks) {
  const { bindings, setVisible } = useModal();
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");

  // this state is used to set the ID for adding description to a particular task
  const [taskActivitiesID, setTaskActivitiesID] = useState("");

  // state for setting ID for setting task priority
  const [priorityID, setPriorityID] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  return (
    <div className="bg-white shadow-sm p-4 flex items-baseline gap-x-4 my-4 rounded-[8px] w-full">
      <div className="h-[30px] w-[30px] rounded-[50%] bg-primary border border-gray-600"></div>
      {/* <div>Actions</div> */}
      <div className="flex items-start flex-col w-[100%]">
        <div className="flex items-center justify-between w-[100%]">
          <h3 className="mb-0">{title}</h3>
          <div className="flex items-center gap-x-4">
            {/* <button className="flex items-center gap-x-2 px-2 py-1 bg-transparent border border-gray-300 rounded-lg">
              <PriorityFlag />
              <span className="text-sm h-6 flex items-center justify-center">
                Priority
              </span>
            </button> */}

            <PriorityHandler
              id={priorityID}
              onClick={() => {
                setPriorityID(id);
                setTaskPriority(priority);
              }}
              taskPriority={taskPriority}
            />

            <button
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
              id={taskActivitiesID}
              onClick={() => setTaskActivitiesID(id)}
            />
          </div>
        </div>
        <p>{content}</p>
        <p>{createdAt}</p>
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
