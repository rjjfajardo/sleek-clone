import { combineReducers, configureStore } from "@reduxjs/toolkit";

import snackbarReducer from "@/store/slice/snackbarSlice";

const reducer = combineReducers({
  snackbar: snackbarReducer,
});

/**
 * The redux store for the application.
 * @public
 */
export const store = configureStore({
  reducer,
});

/**
 * The top level redux state for the application.
 */
export type RootState = ReturnType<typeof reducer>;

/**
 * The redux dispatch function type.
 */
export type AppDispatch = typeof store.dispatch;
