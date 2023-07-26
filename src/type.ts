// 拖拽开始前事件
interface BeforeDragStartEvent {

}

// 拖拽开始事件
interface DragStartEvent {
  (): void;
}

// 被拖拽元素覆盖事件
interface DragOverEvent {}

// 拖拽结束事件
interface DragEndEvent {}