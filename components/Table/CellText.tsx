import React from "react";
import { Cell, TableState } from "react-table";
import { highlightMatch } from "util/functions/helpers";
import Text from "components/Text/Text";
import styles from "./CellText.module.scss";
import classNames from "classnames";

interface Props<T extends object> {
  text: string;
  cell: Cell<T>;
  className?: string;
}

const CellText = <T extends object>(props: Props<T>) => {
  const classes = classNames(props.className);

  const globalFilter =
    (props.cell.state as Partial<TableState<T>>).globalFilter || "";

  function getTextParts() {
    return highlightMatch(props.text, globalFilter);
  }

  return (
    <Text className={classes}>
      {getTextParts().map((part) => {
        if (globalFilter.toLowerCase() === part.toLowerCase()) {
          return (
            <Text size="5" tag="span" className={styles.highlighted}>
              {part}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};

export default CellText;
