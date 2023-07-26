import React from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createList } from "../mock";

export default {
  title: "DndKit",
  component: Template,
};

function SortableTableRow(props) {
  const { columns, row } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });

  const wrapperStyle = {
    position: "relative",
    // transform: CSS.Transform.toString(transform),
    transform: `translate3d(0, ${transform?.y || 0}px, 0)`,
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <tr key={row.id} ref={setNodeRef} style={wrapperStyle} {...attributes} {...listeners}>
      {columns.map(({ dataIndex }) => (
        <td key={dataIndex}>{row[dataIndex]}</td>
      ))}
    </tr>
  );
}

function Template() {
  const [columns, setColumns] = React.useState(() => [
    {
      title: "Order",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ]);
  // dataSource
  const [items, setItems] = React.useState(() => createList(10));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <table>
          <colgroup>
            {columns.map(({ width }) => (
              <col width={width || "100px"}></col>
            ))}
          </colgroup>
          <thead>
            {columns.map((column) => (
              <th key={column.dataIndex}>{column.title}</th>
            ))}
          </thead>
          <tbody>
            {items.map((row) => (
              <SortableTableRow row={row} columns={columns} />
            ))}
          </tbody>
        </table>
        {/*  */}
        <DragOverlay>
          <div style={{ background: "red", cursor: "grabbing" }}>aaaaa</div>
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
export const SortableTable = Template.bind({});
