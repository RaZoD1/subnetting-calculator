import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

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
    <ListGroup variant="flush" className="w-100">
      {rows?.map((row, i) => {
        const { left, right } = row;

        return (
          <div key={'row' + i}>
            <ListGroup.Item>
              <div
                className="w-50 d-inline-block"
                style={{ textAlign: alignOption.left }}
              >
                {left}
              </div>
              <div
                className="w-50 d-inline-block"
                style={{ textAlign: alignOption.right }}
              >
                {right}
              </div>
            </ListGroup.Item>
          </div>
        );
      })}
    </ListGroup>
  );
}
SplitTable.defaultProps = {
  align: 'left',
  rows: [],
};
