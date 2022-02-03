import type { NextPage } from "next";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const count = useSelector((state) => console.log(state));
  return <div className={styles.container}></div>;
};

export default Home;
