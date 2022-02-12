import React from "react";
import styles from "./GlobalFilters.module.scss";

interface Props {
  column: any;
  mobileOrg?: boolean;
}

const SearchFilter = (props: Props) => {
  const { filter, setFilter } = props.column;
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={filter || "Search"}
      className={
        props.mobileOrg ? styles.filterInputMobileOrg : styles.filterInput
      }
    />
  );
};

const GlobalFilter = {
  SearchFilter,
};

export default GlobalFilter;
