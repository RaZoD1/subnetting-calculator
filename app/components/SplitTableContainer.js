import React from 'react';
import SplitTable from './SplitTable';

import Card from 'react-bootstrap/Card';

export default function SplitTableContainer(props) {
  const { title, rows, align } = props;

  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <SplitTable rows={rows} align={align} />
    </Card>
  );
}
SplitTableContainer.defaultProps = {
  title: 'SplitTableContainer',
  rows: [],
  align: undefined,
};
