import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getUsers } from "../../api/users";
import { loadUsersFail, loadUsersSuccess } from "../slices/usersSlice";
import { GET_USERS, GetUsersType } from "../../types";

function* fetchUsersSaga({
  payload: { token, page = 1 },
}: PayloadAction<{ token: string; page: number }>) {
  try {
    const data: GetUsersType = yield call(() => getUsers({ token, page }));
    yield put(loadUsersSuccess({ total: data.total, users: data.data }));
  } catch (error: any) {
    yield put(
      loadUsersFail(
        error?.message || "There Seem's to be a problem please try again"
      )
    );
  }
}

export function* watchFetchUsers() {
  yield takeLatest(GET_USERS, fetchUsersSaga);
}
