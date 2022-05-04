import React from 'react';
import { IPv4 } from '../utils/IPv4';

export default function IPv4MaskInput(props) {
  const { maskUserString, onChange, placeholder } = props;
  const handleChange = (e) => {
    onChange(e.target.value);
  }
  return (
    <input type="text" value={maskUserString} onChange={handleChange} placeholder={placeholder}/>
  )
}
IPv4MaskInput.defaultProps = {
  maskUserString: '',
  onChange: () => {},
  placeholder: 'Enter an IPv4 Subnetmask'
}
