import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase.config";

type taskInputType = {
  userId: string;
  title: string;
  content: string;
};

export const createTaskToFirebase = createAsyncThunk(
  "createTasks/FB",
  async ({ content, title, userId }: taskInputType) => {
    const taskRef = await addDoc(collection(db, "tasks"), {
      userId: userId,
      title: title,
      content: content,
      priority: "unset",
      isCompleted: false,
      isEdited: false,
      lastEdited: "unset",
      description: "",
      //@ts-ignore
      createdAt: new Date().toLocaleString("en-US", options),
    });

    return taskRef.id;
  }
);
