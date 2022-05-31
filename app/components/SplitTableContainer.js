import React from 'react';
import SplitTable from './SplitTable';
import TitledContainer from './TitledContainer';

import Card from 'react-bootstrap/Card';

export default function SplitTableContainer(props) {
  const { title, rows, align } = props;

  return (
    <Card style={{ width: '30rem' }}>
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
