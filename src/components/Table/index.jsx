import { Columns } from "./Columns";
import { data } from "../../utils/fakeData";
import DataTable from "./DataTable";
import React, { useEffect } from "react";

const Table = () => {
  const [columnVisibility, setColumnVisibility] = React.useState({});

  useEffect(() => {
    // if window size less then 756
    if (window.innerWidth < 756) {
      setColumnVisibility({
        clientName: false,
        projectValue: false,
        projectManager: false,
        expectedDeadline: false,
        completionDate: false,
        tasks: false,
        payment: false,
        milestones: false,
        totalLoggedHours: false,
        estimatedHours: false,
      });
    }
  }, []);

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
