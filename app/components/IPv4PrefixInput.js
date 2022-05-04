import React from 'react';
import { IPv4 } from '../utils/IPv4';

export default function IPv4PrefixInput(props) {
  const { prefixUserString, onChange, placeholder } = props;
  const handleChange = (e) => {
    onChange(e.target.value);
  }
  return (
    <input type="text" value={prefixUserString} onChange={handleChange} placeholder={placeholder}/>
  )
}
IPv4PrefixInput.defaultProps = {
  prefixUserString: '',
  onChange: () => {},
  placeholder: 'Enter an IPv4 prefix'
}
