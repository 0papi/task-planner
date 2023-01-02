import { useModal, Modal, useToasts } from "@geist-ui/core";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { ModalHooksBindings } from "@geist-ui/core/esm/use-modal";
import { Dispatch, SetStateAction } from "react";

import SettingsIcon from "../components/icons & svs/SettingsIcon";
import LeftContainer from "../components/TasksWrappers/LeftContainer";
import RightContainer from "../components/TasksWrappers/RightContainer";
import InfoIcon from "../components/icons & svs/InfoIcon";
import { createTasks } from "../store/taskReducer";
import { options } from "../utils/date";

import DashboardLayout from "../components/Layouts/DashboardLayout";

export default function Home() {
  const { setVisible, bindings } = useModal();

  return (
    <DashboardLayout>
      <div className="py-10 px-10 bg-backgroundMain">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">TList</h2>
          <div className="flex items-center gap-x-2">
            <button
              className="bg-primary text-white py-2 px-6 rounded-xl"
              onClick={() => setVisible(true)}
            >
              Add New Task
            </button>
            <button className="bg-transparent border border-gray-300 rounded-[20%] p-2">
              <SettingsIcon />
            </button>
          </div>
        </div>

        {/* main tasks body */}
        <section className="flex gap-x-14 mt-8">
          <main className="w-3/4">
            <LeftContainer />
          </main>
          <main className="w-1/4">
            <RightContainer />
          </main>
        </section>

        <CreateNewModal bindings={bindings} setVisible={setVisible} />
      </div>
    </DashboardLayout>
  );
}

interface IModal {
  bindings: ModalHooksBindings;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

/***
 * @description Modal for creating task
 *
 */
export const CreateNewModal = ({ bindings, setVisible }: IModal) => {
  const { setToast } = useToasts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const dispatch = useDispatch();

  /**
   * @description function that handles dispatching action to create new task
   */

  // `${new Date().getFullYear()}-${
  //   new Date().getMonth() + 1
  // }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

  const onCreateNewTask = () => {
    // clear error states before running checks
    // this removes any persistent error UI
    setContentError(false);
    setTitleError(false);
    // validate fields
    if (title.trim().length <= 0) {
      setTitleError(true);
      return;
    } else if (content.trim().length <= 0) {
      setContentError(true);
      return;
    }

    // required fields provided go ahead and dispatch action to store
    dispatch(
      createTasks({
        id: nanoid(),
        title,
        content,
        //@ts-ignore
        createdAt: new Date().toLocaleString("en-US", options),
        priority: "unset",
        isCompleted: false,
        isEdited: false,
        lastEdited: "unset",
        description: "",
      })
    );

    setToast({
      text: "Task created",
      type: "success",
    });

    setVisible(false);

    setTitle("");
    setContent("");
    setTitleError(false);
    setContentError(false);
  };

  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>Create New Task</Modal.Title>
        {/* <Modal.Subtitle></Modal.Subtitle> */}
        <Modal.Content>
          <div className="flex items-start flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="block text-sm mt-2 border border-gray-400 py-1 w-full rounded-md indent-2 transition duration-150 ease-in-out hover:shadow-md focus:border-primary focus:shadow-none placeholder:text-[11px]"
              type="text"
              name="title"
              placeholder="Enter the title of your task"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              className="block text-sm mt-2 border border-gray-400 py-1 w-full rounded-md indent-2 transition duration-150 ease-in-out hover:shadow-md focus:border-primary focus:shadow-none placeholder:text-[11px]"
              name="content"
              placeholder="What is the task about? This is usually just a summary of the task"
              id="content"
              maxLength={300}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {contentError && (
              <div className="flex items-center mt-1">
                <InfoIcon />
                <small className="text-[14px] text-red italic">
                  Content is a required field
                </small>
              </div>
            )}
            <small className="ml-auto mt-2 text-red">Max char: 300</small>
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={() => onCreateNewTask()}>Submit</Modal.Action>
      </Modal>
    </>
  );
};
