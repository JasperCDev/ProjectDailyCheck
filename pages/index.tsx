import type { NextPage } from "next";
import React from "react";
import { useAppSelector } from "../store/store";
import BudgetTable from "../components/BudgetTable";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const state = useAppSelector((state) => state);

  return (
    <div className={styles.container}>
      <ul>
        {state.todos.todos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
      <BudgetTable />
      <button>Continue</button>
    </div>
  );
};

export default Home;
