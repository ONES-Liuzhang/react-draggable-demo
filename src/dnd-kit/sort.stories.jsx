import React from "react";
import { DndContext, useDroppable, useSensors, MouseSensor, useSensor } from "@dnd-kit/core";
import { useSortable, SortableContext } from "@dnd-kit/sortable";

export default {
  title: "DndKit",
  component: Template,
};

/**
 * useSortable 可以取代 useDraggable
 *
 * useSortable 外部必须使用 SortableContext 进行包裹
 *
 * @param {*} props
 * @returns
 */
function SortableItem(props) {
  const { children, id } = props;

  const sortableInfo = useSortable({ id });

  console.log("sortableInfo", sortableInfo);

  const { attributes, listeners, setNodeRef, transform, transition } = sortableInfo;

  const style = {
    // transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style}>
      <span {...attributes} {...listeners}>
        {children}
      </span>
    </li>
  );
}

function DropDragContext(props) {
  const { children, items, ...args } = props;

  // 可以配置传感器
  const mouseSensor = useSensors(useSensor(MouseSensor));

  return (
    <DndContext {...args} sensors={mouseSensor}>
      <SortableContext items={items} id="sortable-context1">
        {children}
      </SortableContext>
    </DndContext>
  );
}

function Template() {
  const [items] = React.useState([1, 2, 3]);

  return (
    <DropDragContext items={items}>
      {items.map((id) => (
        <SortableItem id={id} key={id} />
      ))}
    </DropDragContext>
  );
}

export const SortableDemo = Template.bind({});
