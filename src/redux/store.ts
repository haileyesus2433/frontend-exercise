import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./slices/rootReducer";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
