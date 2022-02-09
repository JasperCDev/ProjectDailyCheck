import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const initialTodos = {
  currentTodo: 1,
  todos: [
    {
      title: "Visit Bank",
      id: 1,
    },
    {
      title: "Choose Investments",
      id: 2,
    },
    {
      title: "Review Assets",
      id: 3,
    },
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodos,
  reducers: {},
});

const store = configureStore({ reducer: todosSlice.reducer });

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
