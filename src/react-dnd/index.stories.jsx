import React from "react";
import { HTML5Backend, getEmptyImage } from "react-dnd-html5-backend";
import { DndProvider, DragPreviewImage, useDrag, useDrop, useDragDropManager, useDragLayer } from "react-dnd";
import { createList } from "../mock";

export default {
  title: "ReactDnd",
  component: Template,
};

const ItemTypes = {
  LIST_ITEM: "list-item",
};

const DragDropProvider = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

const DraggableItem = (props) => {
  const { type, id, children, preview } = props;

  const [collected, drag, dragPreview] = useDrag(() => ({
    type,
    item: { id },
    // Optional. A plain JavaScript object describing drag preview options.
    previewOptions: {},
    options: {
      // Optional. Whether the drag source should use a copy drag preview.
      dropEffect: "copy",
      // dropEffect: "move",
    },
    end: (item, monitor) => {
      // monitor.didDrop() - check whether or not the drop was handled by a compatible drop target
      // monitor.getDropResult()
    },
    canDrag: (monitor) => {
      return true;
    },
    // optional
    isDragging: (monitor) => {
      return monitor.getItem().id === id;
    },
    // optional - 可以返回一些自定义 props 给组件
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  // 去掉浏览器的默认拖拽 UI，直接隐藏掉
  // 但本质上还是处于浏览器拖拽中的状态
  React.useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <li ref={drag} {...collected} style={{ cursor: "pointer" }}>
      {children}
    </li>
  );
};

const DragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
    []
  );

  function renderItem() {
    switch (itemType) {
      case ItemTypes.LIST_ITEM:
        return <li>preview!!!</li>;
      default:
        return null;
    }
  }

  if (!isDragging) return null;

  return <>{renderItem()}</>;
};

const Droppable = (props) => {
  const { type } = props;

  const [collectedProps, drop] = useDrop(() => ({
    accept: type,
    drop: (item, monitor) => {
      console.log("[droppable] drop", item, monitor);
    },
    hover: (item, monitor) => {
      console.log("[droppable] hover", item, monitor);
    },
    canDrop: (item, monitor) => {
      console.log("[droppable] canDrop", item, monitor);
      return true;
    },
    collect: (monitor) => {
      console.log("[droppable] collect", monitor);
      return {};
    },
  }));

  return (
    <div ref={drop} className="droppable-box">
      Drop Target
    </div>
  );
};

function Template(props) {
  const { items } = props;
  // 单例 可以在外部获取数据之类的
  // const dragDropManager = useDragDropManager();
  return (
    <DragDropProvider>
      <div className="draggable-list">
        <ul>
          {items.map(({ id, name }) => (
            <DraggableItem type={ItemTypes.LIST_ITEM} key={id} id={id}>
              {name}
            </DraggableItem>
          ))}
        </ul>
      </div>
      <Droppable type={ItemTypes.LIST_ITEM}></Droppable>
      {/* 拖拽层 */}
      <DragLayer />
    </DragDropProvider>
  );
}

const items = createList(20);

export const ReactDnd = Template.bind({});

ReactDnd.args = {
  items,
};
