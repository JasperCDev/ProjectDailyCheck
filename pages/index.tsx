import { createAction } from "@reduxjs/toolkit";
import type { NextPage } from "next";
import { useEffect } from "react";
import { todosSlice, useAppDispatch, useAppSelector } from "../store/store";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const todos = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <ul>
        {todos.todos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
