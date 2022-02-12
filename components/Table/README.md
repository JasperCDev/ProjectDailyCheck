# basic expandable rows example

  
    import React, { useCallback, useMemo } from "react";
    import Table from "components/Table/Table";
    import { Cell, ColumnInstance, Row, TableRowProps } from "react-table";

    const ExpandableTable = () => {
      const columns = useMemo(() => {
        return [
          {
            Header: "",
            id: "expandable",
            Cell: (cell: Cell<any>) => {
              const row = cell.row;
              return (
                // @ts-ignore --- hopfully I figure out later how to get this working with typescript...
                <span {...row.getToggleRowExpandedProps()}>
                  {/* @ts-ignore */}
                  {row.isExpanded ? "v" : ">"}
                </span>
              );
            },
          },
          {
            Header: "header",
            accessor: "test",
          },
        ];
      }, []);

      const renderRowSubComponent = useCallback(
        ({
          row,
          rowProps,
          visibleColumns,
        }) => {
          return (
            <tr {...rowProps}>
              {/* use the visible columns to dictate how many columns the expanded content should span */}
              <td colSpan={visibleColumns.length - 1}>
                {/* EXPANDED CONTENT HERE */}
                test
              </td>
            </tr>
          );
        },
        []
      );

      const data = useMemo(() => {
        return [
          {
            test: "test",
          },
          {
            test: "test2",
          },
          {
            test: "test3",
          },
        ];
      }, []);

      return (
        <Table<any>
          data={data}
          columns={columns}
          renderRowSubComponent={renderRowSubComponent}
        />
      );
    };

    export default ExpandableTable;

