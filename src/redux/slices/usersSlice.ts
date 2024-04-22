import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUsersState, USERS } from "../../types";

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: null,
  limit: 10,
  totalPage: 0,
};

const usersSlice = createSlice({
  name: USERS,
  initialState,
  reducers: {
    loadUsers(state, action) {
      state.isLoading = true;
      state.error = "";
    },
    loadUsersSuccess(
      state,
      {
        payload: { users, total },
      }: PayloadAction<{ users: IUser[]; total: number | string }>
    ) {
      state.isLoading = false;
      state.users = [...state.users, ...users];
      console.log("slice,total", state.totalPage);
      state.totalPage = Math.floor(+total / (state.limit || 10));
      console.log("slice,total", state.totalPage);
    },
    loadUsersFail(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const { loadUsers, loadUsersSuccess, loadUsersFail } =
  usersSlice.actions;

export default usersSlice.reducer;
