import React, { useState } from 'react';
import { IPv4 } from '../utils/IPv4';

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

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  return (
    <input
      type="text"
      value={ipUserString}
      onChange={handleChange}
      placeholder={placeholder}
      style={ipIsValid || ipUserString == '' ? undefined : errorStyle}
    />
  );
}
IPv4Input.defaultProps = {
  onChange: () => {},
  placeholder: 'Enter an IPv4 address',
};
