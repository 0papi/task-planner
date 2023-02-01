import { ITasksFB } from "./../../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { ITasks } from "../../types";

type IFetch = {
  userId: string;
};

export const fetchTasksFromFirebase = createAsyncThunk(
  "tasks/fetchFromFB",
  async ({ userId }: IFetch) => {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks: ITasksFB[] = [];
    querySnapshot.forEach((doc) => {
      // tasks.push({ ...doc.data(), id: doc.id });

      console.log(doc.id, " => ", doc.data());

      tasks.push({
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        description: doc.data().description,
        id: doc.id,
        isCompleted: doc.data().isCompleted,
        isEdited: doc.data().isEdited,
        lastEdited: doc.data().lastEdited,
        priority: doc.data().priority,
        title: doc.data().title,
        userId: doc.data().userId,
      });
    });

    console.log(tasks);
    return tasks;
  }
);
