import React from "react";
import {
  useTable,
  TableOptions,
  TableRowProps,
  Row,
  ColumnInstance,
  IdType,
} from "react-table";
import styles from "./Table.module.scss";

interface Props<T extends object> extends TableOptions<T> {
  className?: string;
  headingClassName?: string;
  bodyClassName?: string;
  filterable?: boolean;
  filters?: Array<{
    title: string;
    type: "select" | "search";
    columnId: string;
    options?: Array<{ value: any; label: string }>;
    defaultValue?: string;
    placeholder?: string;
  }>;
  renderRowSubComponent?: (props: {
    row: Row<T>;
    rowProps: TableRowProps;
    visibleColumns: ColumnInstance<T>[];
  }) => void;
  defaultColumnSortId?: IdType<T>;
  sortDesc?: boolean;
  wallets?: boolean;
  mobileOrg?: boolean;
}

function Table<T extends object>({ data, columns, bodyClassName }: Props<T>) {
  const instance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    instance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}></th>
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
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={cell.value}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
