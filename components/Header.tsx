import React from "react";
import { useAppSelector } from "../store/store";

interface Props {}

const Header = (props: Props) => {
  const state = useAppSelector((state) => state);
  return (
    <header style={{ backgroundColor: "lightblue" }}>
      Balance: {state.balance}
    </header>
  );
};

export default Header;
