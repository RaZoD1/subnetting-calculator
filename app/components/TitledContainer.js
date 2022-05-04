import React from 'react';

export default function TitledContainer(props) {
  return (
    <fieldset>
      <legend>{props.title}</legend>
      {props.children}
    </fieldset>
  );
}
TitledContainer.defaultProps = {
  title: 'TitledContainer',
  children: null,
};
