import { Popover, useModal, useToasts } from "@geist-ui/core";
import { useDispatch } from "react-redux";
import Elipsis from "../icons & svs/ElipsisIcon";
import { deleteTask } from "../../store/taskReducer";
import AddDescriptionModal from "../Modals/AddDescriptionModal";

interface ITaskActs {
  id: string;
  onClick: () => void;
}

export default function TaskActivities({ id, onClick }: ITaskActs) {
  const dispatch = useDispatch();
  const { bindings, setVisible } = useModal();
  const { setToast } = useToasts();

  const TaskActions = () => {
    const classes =
      "bg-transparent hover:bg-gray-200 w-full px-2 py-1 outline-none border-none focus:outline-none focus:border-none";
    return (
      <div className="flex items-start gap-y-2 flex-col">
        <button className={`${classes}`} onClick={() => setVisible(true)}>
          Add Description
        </button>
        <button
          className={`text-red ${classes} text-left`}
          onClick={() => {
            dispatch(deleteTask({ id }));

            setToast({
              text: "Task deleted successfully",
              type: "success",
            });
          }}
        >
          Delete
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
