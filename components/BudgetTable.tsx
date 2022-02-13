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
            return row.values["Amount"] + sum;
          }, 0);
        },
      },
    ];
    // Interestingly, eslint sees that I'm using the state variable, but can't see that I'm only using it for TypeScript, so adding it as a dependancy wouldn't make any sense
  }, []);

  return <Table data={state.budget} columns={columns} />;
};

export default BudgetTable;
