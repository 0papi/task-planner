import { Modal, useToasts } from "@geist-ui/core";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import { updateTaskDescription } from "../../store/taskReducer";
import { IModal } from "../../types";
import InfoIcon from "../icons & svs/InfoIcon";

interface IEditModal extends IModal {
  id: string;
  descriptionEdit: string;
  setDescriptionEdit: Dispatch<SetStateAction<string>>;
}

export default function EditDescription({
  id,
  descriptionEdit,
  setDescriptionEdit,
  bindings,
  setVisible,
}: IEditModal) {
  const { setToast } = useToasts();
  const dispatch = useDispatch();

  const [descriptionError, setDescriptionError] = useState(false);
  function onSubmitDescription() {
    setDescriptionError(false);

    if (descriptionEdit?.trim().length <= 0) {
      setDescriptionError(true);
      return;
    }

    dispatch(updateTaskDescription({ id, description: descriptionEdit }));

    setToast({
      text: "Description updated",
      type: "success",
    });
    setVisible(false);
  }
  return (
    <Modal {...bindings}>
      <Modal.Title>Add Task Description</Modal.Title>
      <Modal.Content>
        <div className="flex items-start flex-col mt-4">
          <label htmlFor="description">Description</label>
          <textarea
            className="block text-sm mt-2 border border-gray-400 py-1 w-full rounded-md indent-2 transition duration-150 ease-in-out hover:shadow-md focus:border-primary focus:shadow-none h-[100px]"
            name="description"
            placeholder="What is the task about?"
            id="description"
            value={descriptionEdit}
            onChange={(e) => setDescriptionEdit(e.target.value)}
          />
          {descriptionError && (
            <div className="flex items-center mt-1">
              <InfoIcon />
              <small className="text-[14px] text-red italic">
                Description field cannot be empty
              </small>
            </div>
          )}
        </div>
      </Modal.Content>
      <Modal.Action
        passive
        onClick={() => {
          setVisible(false);
          setDescriptionError(false);
        }}
      >
        Cancel
      </Modal.Action>
      <Modal.Action
        onClick={() => onSubmitDescription()}
        //   className="bg-primary text-white py-2 px-6 rounded-xl"
      >
        Update Description
      </Modal.Action>
    </Modal>
  );
}
