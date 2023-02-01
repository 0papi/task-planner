import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskReducer";
import currentUserReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const userPersistConfig = {
  key: "currentUser",
  storage,
};

const rootReducer = combineReducers({
  tasks: taskReducer,
  currentUser: persistReducer(userPersistConfig, currentUserReducer),
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
