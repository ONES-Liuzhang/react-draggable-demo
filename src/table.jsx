import React from "react";

const SimpleTable = React.forwardRef((props, ref) => {
  const { columns, dataSource } = props;

  return (
    <table ref={ref}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((record) => (
          <tr key={record.key}>
            {columns.map((column) => (
              <td key={column.key}>{record[column.dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default React.memo(SimpleTable);
