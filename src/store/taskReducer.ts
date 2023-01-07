import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  IDeleteTask,
  IDescription,
  ITaskPriority,
  ITasks,
  IUpdateTask,
} from "../types";

interface IAppState {
  error: string | null;
  success: boolean;
  taskList: ITasks[];
}

const initialState: IAppState = {
  taskList: [],
  error: null,
  success: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTasks: (state, action: PayloadAction<ITasks>) => {
      state.taskList.push(action.payload);
    },
    updateSuccessState: (state, action) => {
      state.success = true;
    },
    updateErrorState: (state, action) => {
      state.success = true;
    },
    updateTask: (state, action: PayloadAction<IUpdateTask>) => {
      const existingTask = state.taskList.find(
        (task) => task.id === action.payload.id
      );
      if (existingTask) {
        existingTask.content = action.payload.content;
        existingTask.title = action.payload.title;
        existingTask.isEdited = true;
      }
    },
    deleteTask: (state, action: PayloadAction<IDeleteTask>) => {
      const taskToDeleteIndex = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
      state.taskList.splice(taskToDeleteIndex, 1);
    },
    updateTaskDescription: (state, action: PayloadAction<IDescription>) => {
      const existingTask = state.taskList.find(
        (task) => task.id === action.payload.id
      );
      if (existingTask) {
        existingTask.description = action.payload.description;
      }
    },
    setTaskPriority: (state, action: PayloadAction<ITaskPriority>) => {
      const existingTask = state.taskList.find(
        (task) => task.id === action.payload.id
      );
      if (existingTask) {
        existingTask.priority = action.payload.priority;
      }
    },
    setTaskComplete: (state, action) => {
      const existingTask = state.taskList.find(
        (task) => task.id === action.payload.id
      );
      if (existingTask) {
        existingTask.isCompleted = true;
      }
    },
  },
});

export const {
  createTasks,
  updateSuccessState,
  updateErrorState,
  updateTask,
  updateTaskDescription,
  deleteTask,
  setTaskPriority,
  setTaskComplete,
} = taskSlice.actions;

export const selectTaskList = (state: RootState) => state.taskList;
export const selectSuccessState = (state: RootState) => state.success;
export const selectErrorState = (state: RootState) => state.error;

export default taskSlice.reducer;
