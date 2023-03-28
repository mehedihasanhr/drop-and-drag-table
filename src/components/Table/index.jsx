import { Columns } from "./Columns";
import { data } from "../../utils/fakeData";
import DataTable from "./DataTable";
import React from "react";

const Table = () => {
  const [columnVisibility, setColumnVisibility] = React.useState({});

  return (
    <DataTable
      defaultColumns={Columns}
      data={data}
      columnVisibility={columnVisibility}
      setColumnVisibility={setColumnVisibility}
    />
  );
};

export default Table;
