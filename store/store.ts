import { configureStore } from "@reduxjs/toolkit";
import { createStore, Action } from "redux";

function counterReducer(state = { test: 14 }, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default configureStore({ reducer: counterReducer });
