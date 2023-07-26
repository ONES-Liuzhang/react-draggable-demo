import React from "react";
import { DndContext, useSensors, useSensor, closestCenter, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
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

function SortableItem(props) {
  const { content } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const wrapperStyle = {
    position: "relative",
    // transform: CSS.Transform.toString(transform),
    transform: `translate3d(0, ${transform?.y || 0}px, 0)`,
    transition,
    zIndex: transform ? 1 : undefined,
  };

  return (
    <li ref={setNodeRef} style={wrapperStyle} {...attributes} {...listeners}>
      {/* ... */}
      {content}
    </li>
  );
}

function Template() {
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
        {items.map(({ id, name }) => (
          <SortableItem key={id} id={id} content={name} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
export const SortableList = Template.bind({});
