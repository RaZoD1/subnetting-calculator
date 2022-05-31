import React, { useState } from 'react';
import { IPv4 } from '../utils/IPv4';

import Form from 'react-bootstrap/Form';

export default function IPv4Input(props) {
  const { onChange, placeholder } = props;

  const [ipUserString, setIpUserString] = useState('');
  const [ipIsValid, setIpIsValid] = useState(false);

  const handleChange = (e) => {
    let text = e.target.value;
    let valid = IPv4.isValid(text);

    setIpUserString(text);
    setIpIsValid(valid);

    if (valid) {
      onChange(new IPv4(text));
    }
  };

  const classes = [];
  if (ipIsValid) classes.push('is-valid');
  if (!(ipIsValid || ipUserString == '')) classes.push('is-invalid');
  return (
    <Form.Control
      type="text"
      value={ipUserString}
      onChange={handleChange}
      placeholder={placeholder}
      className={classes.join(' ')}
    />
  );
}
IPv4Input.defaultProps = {
  onChange: () => {},
  placeholder: 'Enter an IPv4 address',
};
