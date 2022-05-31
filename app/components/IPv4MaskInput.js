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

  const classes = ['form-control'];
  if (maskIsValid) classes.push('is-valid');
  if (!(maskIsValid || maskUserString == '')) classes.push('is-invalid');

  return (
    <input
      type="text"
      value={maskUserString}
      onChange={handleChange}
      placeholder={placeholder}
      className={classes.join(' ')}
    />
  );
}
IPv4MaskInput.defaultProps = {
  onChange: () => {},
  placeholder: 'Enter an IPv4 Subnetmask',
};
