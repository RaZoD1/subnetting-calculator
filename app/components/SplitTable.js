import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

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
    <Table className="mb-0">
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={{ textAlign: alignOption.left }}>{row.left}</td>
            <td style={{ textAlign: alignOption.right }}>{row.right}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    // <ListGroup variant="flush">
    //   {rows?.map((row, i) => {
    //     const { left, right } = row;

    //     return (
    //       <div key={'row' + i}>
    //         <ListGroup.Item>
    //           <div
    //             className="d-inline-block"
    //             style={{ textAlign: alignOption.left }}
    //           >
    //             {left}
    //           </div>
    //           <div
    //             className="d-inline-block"
    //             style={{ textAlign: alignOption.right }}
    //           >
    //             {right}
    //           </div>
    //         </ListGroup.Item>
    //       </div>
    //     );
    //   })}
    // </ListGroup>
  );
}
SplitTable.defaultProps = {
  align: 'left',
  rows: [],
};
