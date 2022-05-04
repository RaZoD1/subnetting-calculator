import React from 'react';
import { IPv4 } from '../utils/IPv4';

export const DisplayTypes = [
  'decimal',
  'binary',
]

export default function IPv4Address(props) {

  const { ipString, displayType, seperator, ip } = props;

  let ipv4 = null;
  if(!(ip instanceof IPv4)) {
    if(!IPv4.isValid(ipString)) {
      return <span>Invalid IPv4 address</span>;
    }

    ipv4 = new IPv4(ipString);
    
  }else {
    ipv4 = ip;
  }
  
  const display = displayType === 'decimal' ? ipv4.getDecimalString(seperator) : ipv4.getBinaryString(seperator);
  return <span>{display}</span>;
}

IPv4Address.defaultProps = {
  ipString: '',
  displayType: 'decimal',
  seperator: '.',
  ip: null,
}