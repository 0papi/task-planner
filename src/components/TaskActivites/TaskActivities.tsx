import { Popover, useModal, useToasts } from "@geist-ui/core";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Elipsis from "../icons & svs/ElipsisIcon";
import { deleteTask, setTaskComplete } from "../../store/taskReducer";
import AddDescriptionModal from "../Modals/AddDescriptionModal";

interface ITaskActs {
  id: string;
  onClick: () => void;
  isCompleted: boolean;
}

export default function TaskActivities({
  id,
  onClick,
  isCompleted,
}: ITaskActs) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bindings, setVisible } = useModal();
  const { setToast } = useToasts();

  const TaskActions = () => {
    const classes =
      "bg-transparent flex items-center gap-x-2 hover:bg-gray-200 w-full px-2 p-1 outline-none border-none focus:outline-none focus:border-none";
    return (
      <div className="flex items-start flex-col">
        <button className={`${classes}`} onClick={() => setVisible(true)}>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <span> Add Description</span>
        </button>

        <button
          className={`text-red ${classes} text-left my-4`}
          onClick={() => {
            dispatch(deleteTask({ id }));

            setToast({
              text: "Task deleted successfully",
              type: "success",
            });
          }}
        >
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>

          <span> Delete Task</span>
        </button>
        <button
          className={`${classes}`}
          onClick={() => {
            dispatch(setTaskComplete({ id }));

            setToast({
              text: "Task completed",
              type: "success",
            });
          }}
          disabled={isCompleted}
        >
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
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>

          <span>{isCompleted ? "Task Completed" : "Mark as Complete"}</span>
        </button>
      </div>
    );
  };
  return (
    <>
      <Popover content={TaskActions}>
        <button
          className="bg-transparent border border-gray-300 rounded-lg p-1"
          onClick={onClick}
        >
          <Elipsis />
        </button>
      </Popover>

      <AddDescriptionModal
        bindings={bindings}
        id={id}
        setVisible={setVisible}
      />
    </>
  );
}
