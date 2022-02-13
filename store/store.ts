import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const initialTodos = {
  currentTodo: 1,
  todos: [
    {
      title: "Visit Bank",
      id: 1,
      completed: false,
    },
    {
      title: "Choose Investments",
      id: 2,
      completed: false,
    },
    {
      title: "Review Assets",
      id: 3,
      completed: false,
    },
  ],
};

const initialBalance = 10000;

const initialBudget = [
  {
    amount: 4000,
    name: "Income",
  },
  {
    amount: -2000,
    name: "Rent",
  },
  {
    amount: -500,
    name: "Car",
  },
  {
    amount: -500,
    name: "Food",
  },
  {
    amount: -200,
    name: "Car Insurance",
  },
  {
    amount: -500,
    name: "Health Insurance",
  },
  {
    amount: -100,
    name: "Electricity",
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodos,
  reducers: {},
});

const balanceSlice = createSlice({
  name: "balance",
  initialState: initialBalance,
  reducers: {
    updateBalance: (bal, action) => {
      bal += action.payload;
    },
  },
});

const budgetSlice = createSlice({
  name: "budget",
  initialState: initialBudget,
  reducers: {},
});

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    balance: balanceSlice.reducer,
    budget: budgetSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
