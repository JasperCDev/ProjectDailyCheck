/* this is because it's failing to realize that the functions
  getHeaderGroupProps and getRowProps return key props already */
/* eslint-disable react/jsx-key */
import classNames from "classnames";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import {
  useExpanded,
  useTable,
  useFilters,
  TableOptions,
  useGlobalFilter,
  TableRowProps,
  Row,
  ColumnInstance,
  useSortBy,
  IdType,
  TableState,
} from "react-table";
import { ColumnFilter } from ".";
import GlobalFilter from "./GlobalFilters";
import Text from "components/Text/Text";
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

function Table<T extends object>({
  data,
  columns,
  className,
  headingClassName,
  bodyClassName,
  filterable,
  filters,
  renderRowSubComponent,
  defaultColumnSortId,
  sortDesc,
  wallets,
  mobileOrg,
}: Props<T>) {
  const classes = classNames(className, {
    [styles.table]: true,
  });

  const defaultColumn = useMemo(
    () => ({
      disableFilters: true,
      Filter: ColumnFilter.SearchFilter,
    }),
    []
  );

  function createInitialState(): Partial<TableState<T>> {
    if (!defaultColumnSortId) return {};
    return {
      sortBy: [
        {
          id: defaultColumnSortId,
          desc: sortDesc,
        },
      ],
    };
  }

  const instance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: createInitialState(),
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    setGlobalFilter,
    setFilter,
  } = instance;

  const router = useRouter();

  return (
    <>
      {filterable &&
        (mobileOrg ? (
          <GlobalFilter.SearchFilter
            column={{
              filter: state.globalFilter,
              setFilter: setGlobalFilter,
            }}
            mobileOrg
          />
        ) : (
          <GlobalFilter.SearchFilter
            column={{
              filter: state.globalFilter,
              setFilter: setGlobalFilter,
            }}
          />
        ))}
      {filters &&
        filters.map((filter) => {
          switch (filter.type) {
            case "select":
              return (
                <>
                  <span style={{ paddingLeft: "20px", fontSize: "0.75rem" }}>
                    {filter.title}
                  </span>
                  <select
                    className={styles.filters}
                    onChange={(e) => {
                      setFilter(filter.columnId, e.target.value);
                    }}
                  >
                    {filter.options?.map((option) => {
                      return (
                        <option
                          value={option.value}
                          label={option.label}
                          selected={option.value === filter.defaultValue}
                        />
                      );
                    })}
                  </select>
                </>
              );
            case "search":
              return (
                <div className={styles.searchContainer}>
                  <input
                    className={styles.filters + " " + styles.search}
                    onChange={(e) => setFilter(filter.columnId, e.target.value)}
                    placeholder={filter.placeholder || ""}
                  />
                </div>
              );
          }
        })}
      <table className={classes} {...getTableProps()}>
        <thead
          className={
            wallets
              ? styles.table__walletsHead + " " + headingClassName
              : styles.table__head + " " + headingClassName
          }
        >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.isSorted ? styles.sortedHeader : ""}
                >
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <Text tag="span" size="2">
                        {" "}
                        &#8595;
                      </Text>
                    ) : (
                      <Text tag="span" size="2">
                        {" "}
                        &#8593;
                      </Text>
                    )
                  ) : (
                    <Text tag="span" size="2" className={styles.invisible}>
                      {" "}
                      &#8593;
                    </Text>
                  )}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
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
            const rowProps = row.getRowProps();
            const clickHandler = () => {
              // @ts-ignore
              if (row?.original?.href) {
                // @ts-ignore
                router.push(row.original.href);
              }
            };
            return (
              <>
                <tr {...row.getRowProps()} onClick={clickHandler}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {row.isExpanded &&
                  renderRowSubComponent &&
                  renderRowSubComponent({ row, rowProps, visibleColumns })}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
