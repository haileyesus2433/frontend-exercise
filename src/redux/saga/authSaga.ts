import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  IInputs,
  LOGIN,
  LOGOUT,
  SIGNUP,
  UPDATE,
  UpdatetUserReturnType,
  ILoginType,
} from "../../types";

import { Login, Register, updateUser } from "../../api/auth";
import {
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  signupFail,
  signupSuccess,
  updateFail,
  updateSuccess,
} from "../slices/authSlice";

function* loginSaga({
  payload: { email, password },
}: PayloadAction<{ email: string; password: string }>) {
  try {
    const data: ILoginType = yield call(() => Login({ email, password }));
    yield put(loginSuccess({ token: data.token, user: { ...data } }));
  } catch (error: any) {
    yield put(
      loginFail(
        error?.message || "There Seem's to be a problem logging in try again"
      )
    );
  }
}

function* signupSaga({ payload: inputs }: PayloadAction<IInputs>) {
  try {
    yield call(() => Register(inputs));
    yield put(signupSuccess({}));
  } catch (error: any) {
    yield put(
      signupFail(
        error?.message || "There Seem's to be a problem signinig up try again"
      )
    );
  }
}

function* updateSaga({
  payload: { values, id, token },
}: PayloadAction<{ id: string; token: string; values: Partial<IInputs> }>) {
  try {
    const data: UpdatetUserReturnType = yield call(() =>
      updateUser({ id, token, values })
    );
    yield put(updateSuccess(data));
  } catch (error: any) {
    yield put(
      updateFail(
        error?.message ||
          "There Seem's to be a problem updating your data try again"
      )
    );
  }
}

function* logoutSaga() {
  try {
    yield put(logoutSuccess({}));
  } catch (error: any) {
    yield put(
      logoutFail(
        error?.message || "There Seem's to be a problem logging out try again"
      )
    );
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, loginSaga);
}

export function* watchSignup() {
  yield takeLatest(SIGNUP, signupSaga);
}

export function* watchUpdate() {
  yield takeLatest(UPDATE, updateSaga);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logoutSaga);
}
