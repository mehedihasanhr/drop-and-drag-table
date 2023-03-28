import { createColumnHelper } from "@tanstack/react-table";
import * as React from "react";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
const columnHelper = createColumnHelper();

export const Columns = [
  // select all
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  // id
  columnHelper.accessor("id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "SL. No",
  }),

  // Project Name
  columnHelper.accessor("projectName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Name",
  }),

  // Client Name
  columnHelper.accessor("clientName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Client Name",
  }),

  // Project Value
  columnHelper.accessor("projectValue", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Value",
  }),

  // Project Manager
  columnHelper.accessor("projectManager", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Manager",
  }),

  // Start Date
  columnHelper.accessor("startDate", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Start Date",
  }),

  // Expected Deadline
  columnHelper.accessor("expectedDeadline", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Expected Deadline",
  }),

  // Completion Date
  columnHelper.accessor("completionDate", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Completion Date",
  }),

  // Extimated Hours
  columnHelper.accessor("estimatedHours", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Extimated Hours",
  }),

  // Total Logged Hours
  columnHelper.accessor("totalLoggedHours", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Total Logged Hours",
  }),

  // Tasks
  columnHelper.accessor("tasks", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Tasks",
  }),

  // Mile Stones
  columnHelper.accessor("milestones", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Mile Stones",
  }),

  // Payment
  columnHelper.accessor("payment", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Payment",
  }),

  // Progress
  columnHelper.accessor("progress", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Progress",
  }),

  // deliverableStatus
  columnHelper.accessor("deliverableStatus", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Deliverable Status",
  }),

  // projectStatus
  columnHelper.accessor("projectStatus", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Status",
  }),
];
