import React, { useState } from 'react';
import { IPv4, IPv4Subnetmask } from '../utils/IPv4';

export default function IPv4MaskInput(props) {
  const { onChange, placeholder } = props;

  const [maskUserString, setMaskUserString] = useState('');
  const [maskIsValid, setMaskIsValid] = useState(false);

  const handleChange = (e) => {
    let text = e.target.value;
    let valid = IPv4Subnetmask.isValid(text);

    setMaskUserString(text);
    setMaskIsValid(valid);

    if (valid) {
      onChange(new IPv4Subnetmask(text));
    }
  };

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
    border: '1px solid red',
  };

  return (
    <input
      type="text"
      value={maskUserString}
      onChange={handleChange}
      placeholder={placeholder}
      style={maskIsValid || maskUserString == '' ? undefined : errorStyle}
    />
  );
}
IPv4MaskInput.defaultProps = {
  onChange: () => {},
  placeholder: 'Enter an IPv4 Subnetmask',
};
