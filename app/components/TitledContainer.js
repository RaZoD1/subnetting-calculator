import React from 'react';

export default function TitledContainer(props) {
  return (
    <fieldset style={{ width: 'max-content', height: 'max-content' }}>
      <legend>{props.title}</legend>
      {props.children}
    </fieldset>
  );
}
TitledContainer.defaultProps = {
  title: 'TitledContainer',
  children: null,
};
