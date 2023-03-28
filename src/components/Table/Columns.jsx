import { createColumnHelper } from "@tanstack/react-table";
import * as React from "react";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
const columnHelper = createColumnHelper();

export const Columns = [
  // select all
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <IndeterminateCheckbox
  //       {...{
  //         checked: table.getIsAllRowsSelected(),
  //         indeterminate: table.getIsSomeRowsSelected(),
  //         onChange: table.getToggleAllRowsSelectedHandler(),
  //       }}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="px-1">
  //       <IndeterminateCheckbox
  //         {...{
  //           checked: row.getIsSelected(),
  //           indeterminate: row.getIsSomeSelected(),
  //           onChange: row.getToggleSelectedHandler(),
  //         }}
  //       />
  //     </div>
  //   ),
  // },

  // id
  columnHelper.accessor("id", {
    cell: (info) => <span>{info.getValue()}</span>,
    id: "id",
    header: "SL. No",
  }),

  // Project Name
  columnHelper.accessor("projectName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Name",
    id: "projectName",
  }),

  // Client Name
  columnHelper.accessor("clientName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Client Name",
    id: "clientName",
  }),

  // Project Value
  columnHelper.accessor("projectValue", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Value",
    id: "projectValue",
  }),

  // Project Manager
  columnHelper.accessor("projectManager", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Manager",
    id: "projectManager",
  }),

  // Start Date
  columnHelper.accessor("startDate", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Start Date",
    id: "startDate",
  }),

  // Expected Deadline
  columnHelper.accessor("expectedDeadline", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Expected Deadline",
    id: "expectedDeadline",
  }),

  // Completion Date
  columnHelper.accessor("completionDate", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Completion Date",
    id: "completionDate",
  }),

  // Extimated Hours
  columnHelper.accessor("estimatedHours", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Extimated Hours",
    id: "estimatedHours",
  }),

  // Total Logged Hours
  columnHelper.accessor("totalLoggedHours", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Total Logged Hours",
    id: "totalLoggedHours",
  }),

  // Tasks
  columnHelper.accessor("tasks", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Tasks",
    id: "tasks",
  }),

  // Mile Stones
  columnHelper.accessor("milestones", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Mile Stones",
    id: "milestones",
  }),

  // Payment
  columnHelper.accessor("payment", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Payment",
    id: "payment",
  }),

  // Progress
  columnHelper.accessor("progress", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Progress",
    id: "progress",
  }),

  // deliverableStatus
  columnHelper.accessor("deliverableStatus", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Deliverable Status",
    id: "deliverableStatus",
  }),

  // projectStatus
  columnHelper.accessor("projectStatus", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Project Status",
    id: "projectStatus",
  }),
];
