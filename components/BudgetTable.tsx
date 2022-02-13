import React, { useMemo } from "react";
import {
  Cell,
  Column,
  ColumnGroup,
  FooterProps,
  Row,
  useRowSelect,
} from "react-table";
import { useAppSelector } from "../store/store";
import Table from "./Table/Table";

interface Props {}

const BudgetTable = (props: Props) => {
  const state = useAppSelector((state) => state);

  const columns = useMemo(() => {
    return [
      {
        header: "Name",
        id: "Name",
        accessor: (row: typeof state.budget[0]) => row.name,
        Cell: (cell: Cell<typeof state.budget[0]>) => {
          const row = cell.row.original;
          return row.name;
        },
      },
      {
        header: "Amount",
        id: "Amount",
        accessor: (row: typeof state.budget[0]) => row.amount,
        Cell: (cell: Cell<typeof state.budget[0]>) => {
          const row = cell.row.original;
          return row.amount;
        },
        Footer: (col: FooterProps<typeof state.budget[0]>) => {
          return col.rows.reduce((sum, row) => {
            console.log(row.values);
            return row.values["Amount"] + sum;
          }, 0);
        },
      },
    ];
  }, []);

  return <Table data={state.budget} columns={columns} />;
};

export default BudgetTable;
