import { ModalHooksBindings } from "@geist-ui/core/esm/use-modal";
import { Dispatch, SetStateAction } from "react";

export interface ITasks {
  id: string;
  title: string;
  content: string;
  description: string;
  isCompleted: boolean;
  isEdited: boolean;
  createdAt: string;
  lastEdited: string | "unset";
  priority: "high" | "medium" | "low" | "unset";
}

export interface IModal {
  bindings: ModalHooksBindings;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export interface IUpdateTask {
  id: string;
  title: string;
  content: string;
}

export interface IDeleteTask {
  id: string;
}

export interface IDescription {
  id: string;
  description: string;
}

export interface ITaskPriority {
  id: string;
  priority: "high" | "medium" | "low";
}
