import * as React from "react";
import Dropdown from "../Dropdown";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import _ from "lodash";
import Row from "./Row";
import Col from "./Col";
import { useState } from "react";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import DraggableColumnHeader from "./Col";

// DataTable  component
const DataTable = ({
  defaultColumns,
  data,
  columnVisibility = {},
  setColumnVisibility,
}) => {
  const [columns, setColumns] = React.useState([...defaultColumns]);
  const [hoverColumnIndex, setHoverColumnIndex] = useState(null);
  const [columnOrder, setColumnOrder] = React.useState(
    columns.map((column) => column.id)
  );

  const [selectedRows, setSelectedRows] = React.useState({});
  const [tableData, setTableData] = React.useState([...data]);

  const defaultColumnsChange = React.useMemo(() => {
    return defaultColumns;
  }, [defaultColumns]);

  const defaultTableData = React.useMemo(() => {
    return data;
  }, [data]);

  const getRowId = React.useCallback((r) => {
    return r.id;
  }, []);

  // get columns order from localstore
  React.useEffect(() => {
    const co = localStorage.getItem("columeOrder");
    if (co) {
      setColumnOrder(JSON.parse(co));
    }
  }, []);

  /// set default columns
  React.useEffect(() => {
    setColumns([...defaultColumnsChange]);
    setTableData([...defaultTableData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultColumnsChange, defaultTableData]);

  // table instance
  const table = useReactTable({
    data: tableData,
    columns: columns,
    state: {
      columnOrder,
      columnVisibility,
      rowSelection: selectedRows,
    },
    getRowId,

    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setSelectedRows,
  });

  //
  const resetOrder = () => {
    setColumnOrder(columns.map((column) => column.id));
    localStorage.removeItem("columeOrder");
  };

  if (!table) return null;

  return (
    <div className="h-full" style={{ maxHeight: "calc(100vh - 145px)" }}>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3 px-3 py-2">
        <div className="ml-auto flex items-center space-x-3">
          {_.isEmpty(selectedRows) ? null : (
            <div className="flex items-center space-x-3">
              {/* edit */}
              <button
                type="button"
                className="font-medium flex items-center text-sm px-5 gap-2 py-2 rounded-md border border-dashed hover:bg-slate-200"
              >
                <i className="fi fi-rr-edit sm:text-xs -mb-1 " />
                <span className="hidden md:flex">Edit</span>
              </button>

              {/* delete */}

              <button
                type="button"
                className="font-medium flex items-center text-sm px-5 gap-2 py-2 rounded-md border border-dashed hover:bg-slate-200"
              >
                <i className="fi fi-rr-trash sm:text-xs -mb-1 " />
                <span className="hidden md:flex">Delete</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={resetOrder}
            className="font-medium flex items-center text-sm px-5 gap-2 py-2 rounded-md border border-dashed"
          >
            <i className="bi bi-sliders2 sm:text-xs -mb-1 " />
            <span className="hidden md:flex">Reset Column</span>
          </button>

          {/* filter button */}
          <Dropdown placement="bottom-end">
            <Dropdown.Toggle className="flex items-center space-x-2">
              <button
                type="button"
                className="font-medium flex items-center text-sm px-5 gap-2 py-2 rounded-md border border-dashed"
              >
                <i className="bi bi-sliders2 sm:text-xs -mb-1 " />
                <span className="hidden md:flex">Filter</span>
              </button>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="p-4 bg-white shadow-lg rounded-md">
                <div className="px-1">
                  <label
                    className="flex items-center gap-2"
                    onMouseDown={() => localStorage.removeItem("filter_cols")}
                  >
                    <input
                      {...{
                        type: "checkbox",
                        checked: table.getIsAllColumnsVisible(),
                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                      }}
                    />
                    Select All
                  </label>
                </div>
                {table?.getAllLeafColumns()?.map((column) => {
                  return (
                    <div key={column.id} className="px-1">
                      <label className="flex items-center gap-2">
                        <input
                          {...{
                            type: "checkbox",
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                        />
                        {_.upperFirst(column.id)}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* data table */}
      <div className="h-full">
        <div className="border max-w-screen h-full overflow-x-auto mt-5">
          <div className="w-full h-full overflow-x-auto">
            <DndProvider backend={HTML5Backend}>
              <table className="table-auto">
                <colgroup>
                  {columns.map((c, i) => (
                    <col
                      key={i}
                      className={`${i === hoverColumnIndex ? "bg-red-50" : ""}`}
                    />
                  ))}
                </colgroup>
                <thead>
                  {table?.getHeaderGroups()?.map((headerGroup, index) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <DraggableColumnHeader
                          key={header.id}
                          header={header}
                          table={table}
                        />
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table?.getRowModel()?.rows?.map((row) => (
                    <Row key={row.id} row={row} flexRender={flexRender} />
                  ))}
                </tbody>
              </table>
            </DndProvider>
          </div>
        </div>
      </div>

      {/* pagination */}
      <div className="py-5">
        <div className="flex items-center flex-wrap gap-3 text-sm">
          <button
            className="border rounded p-1 flex items-center hover:bg-slate-100"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <i className="bi bi-chevron-double-left -mb-1" />
          </button>
          <button
            className="border rounded  p-1 flex items-center hover:bg-slate-100"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <i className="bi bi-chevron-compact-left -mb-1" />
          </button>
          <button
            className="border rounded  p-1 flex items-center hover:bg-slate-100"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <i className="bi bi-chevron-right -mb-1" />
          </button>
          <button
            className="border rounded  p-1 flex items-center hover:bg-slate-100"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <i className="bi bi-chevron-double-right -mb-1" />
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
