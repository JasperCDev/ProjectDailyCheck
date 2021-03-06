{
  /* eslint-disable react/jsx-key */
}
import React from "react";
import {
  useTable,
  TableOptions,
  TableRowProps,
  Row,
  ColumnInstance,
  IdType,
} from "react-table";

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = instance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((group) => (
          <tr {...group.getHeaderGroupProps()}>
            {group.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

export default Table;
