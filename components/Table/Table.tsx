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
        {headerGroups.map((group) => {
          const { key, ...rest } = group.getHeaderGroupProps();
          return (
            <tr key={key} {...rest}>
              {group.headers.map((column) => {
                const { key, ...rest } = column.getHeaderProps();
                return (
                  <th key={key} {...rest}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...rest } = row.getRowProps();
          return (
            <tr key={key} {...rest}>
              {row.cells.map((cell) => {
                const { key, ...rest } = cell.getCellProps();
                return (
                  <td key={key} {...rest}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((group) => {
          const { key, ...rest } = group.getFooterGroupProps();
          return (
            <tr key={key} {...rest}>
              {group.headers.map((column) => {
                const { key, ...rest } = column.getFooterProps();
                return (
                  <td key={key} {...rest}>
                    {column.render("Footer")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tfoot>
    </table>
  );
}

export default Table;
