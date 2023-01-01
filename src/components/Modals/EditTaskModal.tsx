import { Modal, useToasts } from "@geist-ui/core";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";

import InfoIcon from "../icons & svs/InfoIcon";
import { IModal } from "../../types";
import { updateTask } from "../../store/taskReducer";
interface IEditModal extends IModal {
  id: string;
  taskTitle: string;
  taskContent: string;
  setTaskTitle: Dispatch<SetStateAction<string>>;
  setTaskContent: Dispatch<SetStateAction<string>>;
}

export default function EditTaskModal({
  bindings,
  setVisible,
  setTaskTitle,
  taskContent,
  setTaskContent,
  taskTitle,
  id,
}: IEditModal) {
  const { setToast } = useToasts();
  const dispatch = useDispatch();
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const onSubmitTaskEdit = () => {
    // clear error states before running checks
    // this removes any persistent error UI
    setContentError(false);
    setTitleError(false);
    // validate fields
    if (taskTitle.trim().length <= 0) {
      setTitleError(true);
      return;
    } else if (taskContent.trim().length <= 0) {
      setContentError(true);
      return;
    }

    // required fields provided go ahead and dispatch action to store
    dispatch(
      updateTask({
        id: id,
        title: taskTitle,
        content: taskContent,
      })
    );

    setToast({
      text: "Task updated successfully",
      type: "success",
    });

    setVisible(false);

    setTaskTitle("");
    setTaskContent("");
    setTitleError(false);
    setContentError(false);
  };
  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>Update Task</Modal.Title>
        {/* <Modal.Subtitle>Edit </Modal.Subtitle> */}
        <Modal.Content>
          <div className="flex items-start flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="block text-sm mt-2 border border-gray-400 py-1 w-full rounded-md indent-2 transition duration-150 ease-in-out hover:shadow-md focus:border-primary focus:shadow-none"
              type="text"
              name="title"
              placeholder="Enter the title of your task"
              id="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            {titleError && (
              <div className="flex items-center mt-1">
                <InfoIcon />
                <small className="text-[14px] text-red italic">
                  Title is a required field
                </small>
              </div>
            )}
          </div>
          <div className="flex items-start flex-col mt-4">
            <label htmlFor="content">Content</label>
            <textarea
              className="block text-sm mt-2 border border-gray-400 py-1 w-full rounded-md indent-2 transition duration-150 ease-in-out hover:shadow-md focus:border-primary focus:shadow-none"
              name="content"
              placeholder="What is the task about?"
              id="content"
              maxLength={300}
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
            />
            {contentError && (
              <div className="flex items-center mt-1">
                <InfoIcon />
                <small className="text-[14px] text-red italic">
                  Content is a required field
                </small>
              </div>
            )}
            <small className="ml-auto mt-2 text-yellow">Max char: 300</small>
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={() => onSubmitTaskEdit()}
          //   className="bg-primary text-white py-2 px-6 rounded-xl"
        >
          Update Task
        </Modal.Action>
      </Modal>
    </>
  );
}
