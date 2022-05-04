import React from 'react';
import { IPv4 } from '../utils/IPv4';

export default function IPv4Input(props) {
  const { ipUserString, onChange, placeholder } = props;
  const handleChange = (e) => {
    onChange(e.target.value);
  }
  return (
    <input type="text" value={ipUserString} onChange={handleChange} pattern={IPv4.regexIPv4} placeholder={placeholder}/>
  )
}
IPv4Input.defaultProps = {
  ipUserString: '',
  onChange: () => {},
  placeholder: 'Enter an IPv4 address'
}
