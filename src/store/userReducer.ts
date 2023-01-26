import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// @todo -- CREATE USER OBJECT USER INTERFACE
interface IUserObject {
  displayName: string;
  email: string;
  uid: string;
  photoUrl: string;
  accessToken: string;
}

interface CurrentUserState {
  user: IUserObject | null;
  error: string | null;
}

const initialState: CurrentUserState = {
  user: null,
  error: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUserObject | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    setCurrentUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, setCurrentUserError } = currentUserSlice.actions;

export const getCurrentUser = (state: RootState) => state.currentUser.user;
export const getCurrentUserError = (state: RootState) =>
  state.currentUser.error;

export default currentUserSlice.reducer;
