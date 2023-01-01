import { Popover } from "@geist-ui/core";
import { useDispatch } from "react-redux";

import { setTaskPriority } from "../../store/taskReducer";
import PriorityFlag from "../icons & svs/PriorityFlag";

interface IPriority {
  id: string;
  onClick: () => void;
  taskPriority: string;
}

export default function PriorityHandler({
  id,
  onClick,
  taskPriority,
}: IPriority) {
  const dispatch = useDispatch();

  /**
   * this function returns jsx options for setting priority
   */
  const PriorityOptions = () => {
    const classes =
      "bg-transparent hover:bg-gray-200 w-full px-2 py-1 outline-none border-none focus:outline-none focus:border-none text-left";
    return (
      <div className="flex items-start gap-y-2 flex-col">
        <button
          className={`${classes}`}
          onClick={() => dispatch(setTaskPriority({ id, priority: "high" }))}
        >
          High
        </button>
        <button
          className={`${classes}`}
          onClick={() => dispatch(setTaskPriority({ id, priority: "medium" }))}
        >
          Medium
        </button>
        <button
          className={`${classes}`}
          onClick={() => dispatch(setTaskPriority({ id, priority: "low" }))}
        >
          Low
        </button>
      </div>
    );
  };

  const showPriorities =
    taskPriority === "high"
      ? "High"
      : taskPriority === "medium"
      ? "Medium"
      : taskPriority === "low"
      ? "Low"
      : "Priority";
  return (
    <>
      <Popover content={PriorityOptions}>
        <button
          className="flex items-center gap-x-2 px-2 py-1 bg-transparent border border-gray-300 rounded-lg"
          onClick={onClick}
        >
          <PriorityFlag priority={taskPriority} />
          <span className="text-sm h-6 flex items-center justify-center">
            {showPriorities}
          </span>
        </button>
      </Popover>
    </>
  );
}
