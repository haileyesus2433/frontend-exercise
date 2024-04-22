import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH, IAuthState, IInputs, ILoginType, IUser } from "../../types";
const initialState: IAuthState = {
  user: {} as IUser,
  token: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<Partial<IInputs>>) {
      state.isLoading = true;
      state.error = "";
    },
    loginSuccess(
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: IUser; token: string }>
    ) {
      state.isLoading = false;
      state.user = user;
      state.token = token;
    },
    loginFail(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
    signup(state, { payload }: PayloadAction<IInputs>) {
      state.isLoading = true;
    },
    signupSuccess(state, action) {
      state.isLoading = false;
    },
    signupFail(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },

    update(
      state,
      {
        payload,
      }: PayloadAction<{ values: Partial<IInputs>; token: string; id: string }>
    ) {
      state.isLoading = true;
      state.error = "";
    },
    updateSuccess(state, { payload: user }: PayloadAction<Partial<IUser>>) {
      state.isLoading = false;
      state.user = { ...state.user, ...user };
    },
    updateFail(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },

    logout(state, action) {
      state.isLoading = true;
    },
    logoutSuccess(state, action) {
      state.user = {} as IUser;
      state.token = "";
      state.isLoading = false;
      state.error = null;
    },
    logoutFail(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const {
  login,
  loginFail,
  loginSuccess,
  logout,
  logoutSuccess,
  logoutFail,
  signup,
  signupSuccess,
  signupFail,
  update,
  updateSuccess,
  updateFail,
} = authSlice.actions;

export default authSlice.reducer;
