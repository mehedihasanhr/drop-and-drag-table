import { flexRender } from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";

const DraggableColumnHeader = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    console.log(columnOrder);
    columnOrder.splice(
      columnOrder.indexOf(targetColumnId),
      0,
      columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );

    return [...columnOrder];
  };

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );

      localStorage.setItem("columeOrder", JSON.stringify(newColumnOrder));
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      className="relative bg-slate-200 py-2 px-4 text-left"
      style={{
        opacity: isDragging ? 0 : 1,
      }}
    >
      <div ref={previewRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button
          ref={dragRef}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-10"
        >
          🟰
        </button>
      </div>
    </th>
  );
};

export default DraggableColumnHeader;
