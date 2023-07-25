import React from "react";
import Sortable from "sortablejs";
import { createList } from "../mock";

export default {
  title: "Sortable",
  component: ReactSortable,
};

// ====================== hoc ======================
function ReactSortable({ children, options }) {
  const sortableRef = React.useRef(null);

  React.useEffect(() => {
    if (!sortableRef.current) return;
    // 创建实例
    const sortable = Sortable.create(sortableRef.current, options);

    return () => sortable.destroy();
  }, [sortableRef, options]);

  return <div className="sortable-wrapper">{children?.({ listRef: sortableRef })}</div>;
}

function List(props) {
  const { items } = props;

  return (
    <ReactSortable
      options={{
        group: "list",
        sort: true,
        pull: "clone",
      }}
    >
      {({ listRef }) => {
        return (
          <ul ref={listRef}>
            {items.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        );
      }}
    </ReactSortable>
  );
}
export const SortableList = List.bind({});
SortableList.args = {
  items: createList(20),
};

function Table(props) {
  const { columns, dataSource } = props;

  return (
    <ReactSortable
      options={{
        group: "table",
        sort: true,
        pull: "clone",
      }}
    >
      {({ listRef }) => (
        <table>
          <colgroup>
            {columns.map(({ dataIndex, width }) => (
              <col key={dataIndex} width={width || "100px"} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map(({ title, dataIndex }) => (
                <th key={dataIndex}>{title}</th>
              ))}
            </tr>
          </thead>
          {/* 拖拽相关的要挂在 body 上 */}
          <tbody ref={listRef}>
            {dataSource.map((record) => (
              <tr key={record.id}>
                {columns.map(({ dataIndex }) => (
                  <td key={dataIndex}>{record[dataIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ReactSortable>
  );
}
export const SortableTable = Table.bind({});
SortableTable.args = {
  columns: [
    { title: "th1", dataIndex: "th1" },
    { title: "th2", dataIndex: "th2" },
  ],
  dataSource: [
    { id: 1, th1: "th1", th2: "th2" },
    { id: 2, th1: "th1", th2: "th2" },
  ],
};
