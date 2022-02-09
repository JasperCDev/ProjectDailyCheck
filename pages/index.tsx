import { createAction } from "@reduxjs/toolkit";
import type { NextPage } from "next";
import { useEffect } from "react";
import { counterSlice, useAppDispatch, useAppSelector } from "../store/store";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const count = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <p>{count.value}</p>
    </div>
  );
};

export default Home;
