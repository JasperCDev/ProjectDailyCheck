/* this is because it's failing to realize that the functions
  getHeaderGroupProps and getRowProps return key props already */
/* eslint-disable react/jsx-key */
import classNames from "classnames";
import React, { ReactElement, useMemo } from "react";
import { useGlobalFilter, useTable } from "react-table";
import styles from "./Table.module.scss";
import skeletonStyles from "./SkeletonTable.module.scss";
import GlobalFilter from "./GlobalFilters";

interface Props {
  columnHeadings: Array<string | ReactElement>;
  rowCount: number;
  className?: string;
  headingClassName?: string;
  bodyClassName?: string;
  filterable?: boolean;
}

function SkeletonTable({
  className,
  columnHeadings,
  rowCount,
  headingClassName,
  bodyClassName,
  filterable,
}: Props) {
  const classes = classNames(className, {
    [styles.table]: true,
  });

  const columns = useMemo(
    () =>
      columnHeadings.map((col, indx) => ({
        Header: col,
        id:
          typeof col === "string"
            ? col + "_skeleton" + indx
            : col.props.title + "_skeleton" + indx,
        Cell: () => <div className={skeletonStyles.bar}></div>,
      })),
    [columnHeadings]
  );

  const data = useMemo(() => {
    const dataArr = [];

    for (let i = 0; i < rowCount; i++) {
      const row: { [key: string]: "loading..." } = {};
      columnHeadings.forEach((col) => {
        const accessor = typeof col === "string" ? col : col.props.title;
        row[accessor] = "loading...";
      });

      dataArr.push(row);
    }
    return dataArr;
  }, [rowCount, columnHeadings]);

  const instance = useTable({ columns, data }, useGlobalFilter);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = instance;

  return (
    <>
      {filterable && (
        <GlobalFilter.SearchFilter
          column={{
            filter: state.globalFilter,
            setFilter: setGlobalFilter,
          }}
        />
      )}
      <table className={classes} {...getTableProps()}>
        <thead className={styles.table__head + " " + headingClassName}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className={styles.table__body + " " + bodyClassName}
          {...getTableBodyProps()}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={skeletonStyles.skeletonCell}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SkeletonTable;
