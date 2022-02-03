import { createStore, Action } from "redux";

function counterReducer(state = {}, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default createStore(counterReducer);
