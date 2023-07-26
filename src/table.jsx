import React from "react";

const SimpleTable = React.forwardRef((props, ref) => {
  const { columns, dataSource } = props;

  return (
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
          <tbody ref={ref}>
            {dataSource.map((record) => (
              <tr key={record.id}>
                {columns.map(({ dataIndex }) => (
                  <td key={dataIndex}>{record[dataIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  );
});

export default React.memo(SimpleTable);
