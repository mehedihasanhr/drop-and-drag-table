import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DND_ITEM_TYPE = "Columns";

const Col = ({ headerGroup, index, flexRender, moveCol }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCol(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: DND_ITEM_TYPE, index },
    type: DND_ITEM_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(dragRef));

  return (
    <tr ref={dropRef} key={headerGroup.id}>
      {headerGroup?.headers?.map((header) => (
        <th
          ref={dragRef}
          key={header.id}
          className="bg-slate-200 py-2 px-4 text-left select-none"
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  );
};

export default Col;
