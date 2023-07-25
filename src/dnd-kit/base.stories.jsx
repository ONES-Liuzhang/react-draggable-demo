import React from "react";
import { DndContext, useDraggable, useDroppable, useSensor, MouseSensor } from "@dnd-kit/core";

export default {
  title: "DndKit",
  component: Template,
};

function DropDragContext(props) {
  const { children, ...args } = props;

  // 可以配置传感器
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    // activationConstraint: {
    //   distance: 10,
    // },
  });

  return (
    <DndContext {...args} sensors={[mouseSensor]}>
      {children}
    </DndContext>
  );
}

/**
 * 1. Draggable elements
 * 2. Droppable areas
 */
function Draggable(props) {
  const { id } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(0px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li ref={setNodeRef} style={{ ...style }} {...listeners} {...attributes}>
      {props.children}
    </li>
  );
}

function Droppable(props) {
  const { droppableId } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Template() {
  return (
    <DropDragContext>
      <ul>
        <Droppable droppableId="droppable-table">
          <Draggable id="1">啊啊啊啊啊</Draggable>
          <Draggable id="2">啊啊啊啊啊</Draggable>
          <Draggable id="3">啊啊啊啊啊</Draggable>
        </Droppable>
      </ul>
    </DropDragContext>
  );
}

export const Base = Template.bind({});