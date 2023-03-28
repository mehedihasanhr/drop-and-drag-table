import { Columns } from "./Columns";
import { data } from "../../utils/fakeData";
import DataTable from "./DataTable";
import React, { useEffect } from "react";
import _ from "lodash";

const Table = () => {
  const [columnVisibility, setColumnVisibility] = React.useState({});
  useEffect(() => {
    const l = localStorage.getItem("filter_cols");
    if (l) {
      setColumnVisibility(JSON.parse(l));
      return;
    }

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

  useEffect(() => {
    if (!_.isEmpty(columnVisibility)) {
      localStorage.setItem("filter_cols", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const handleFilter = (props) => {
    setColumnVisibility(props);
  };

  return (
    <DataTable
      defaultColumns={Columns}
      data={data}
      columnVisibility={columnVisibility}
      setColumnVisibility={handleFilter}
    />
  );
};

export default Table;
