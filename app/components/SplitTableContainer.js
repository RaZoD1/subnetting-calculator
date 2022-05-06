import React from 'react';
import SplitTable from './SplitTable';
import TitledContainer from './TitledContainer';

export default function SplitTableContainer(props) {
  const { title, rows, align } = props;

  return (
    <TitledContainer title={title}>
      <SplitTable rows={rows} align={align} />
    </TitledContainer>
  );
}
SplitTableContainer.defaultProps = {
  title: 'SplitTableContainer',
  rows: [],
  align: undefined,
};
