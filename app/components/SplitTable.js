import React from 'react';

const alignOptions = {
  left: { left: 'left', right: 'left' },
  right: { left: 'right', right: 'right' },
  inside: { left: 'right', right: 'left' },
  outside: { left: 'left', right: 'right' },
};

export default function SplitTable(props) {
  const { align, rows } = props;
  const alignOption = alignOptions[align] || alignOptions.left;

  return (
    <table className="splitTable">
      <tbody>
        {rows?.map((row, i) => {
          const { left, right } = row;

          return (
            <tr key={'row' + i}>
              <td style={{ textAlign: alignOption.left }}>{left}</td>
              <td style={{ textAlign: alignOption.right }}>{right}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
SplitTable.defaultProps = {
  align: 'left',
  rows: [],
};
