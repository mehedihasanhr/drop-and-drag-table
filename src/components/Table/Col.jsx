import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const DND_ITEM_TYPE = "Columns";

const ColItem = ({ header, flexRender, index, moveCol, onDrop }) => {
  const dragRef = useRef(null);
  const dropRef = useRef(null);
  const [show, setShow] = useState(false);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    drop: () => {
      onDrop();
    },
    hover(item, monitor) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dragRef.current.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
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
    <th
      key={header.id}
      className="relative bg-slate-200 py-2 px-4 text-left"
      style={{ opacity: opacity }}
    >
      <div
        ref={dragRef}
        className="absolute top-0 left-0 w-full h-full z-1"
      ></div>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  );
};

const Col = ({ headerGroup, flexRender, moveCol, onDrop }) => {
  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
  });

  let cols = (v) => [...new Set(v)];
  return (
    <tr ref={drop} key={headerGroup.id}>
      {cols(headerGroup?.headers)?.map((header, index) => (
        <ColItem
          key={header.id}
          header={header}
          index={index}
          moveCol={moveCol}
          onDrop={onDrop}
          flexRender={flexRender}
        />
      ))}
    </tr>
  );
};

export default Col;
