import { all, fork } from "redux-saga/effects";
import { watchLogin, watchLogout, watchSignup, watchUpdate } from "./authSaga";
import { watchFetchUsers } from "./usersSaga";

const rootSaga = function* () {
  yield all([fork(watchLogin), fork(watchSignup)]);
  yield fork(watchFetchUsers);
  yield fork(watchUpdate);
  yield fork(watchLogout);
};

export default rootSaga;
