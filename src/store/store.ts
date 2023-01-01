import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskReducer";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
