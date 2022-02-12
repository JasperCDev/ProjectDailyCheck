import React from "react";
import { useAppSelector } from "../store/store";

interface Props {}

const Header = (props: Props) => {
  const state = useAppSelector((state) => state);
  return <header>Balance: {state.balance.balance}</header>;
};

export default Header;