import React from 'react';
import { IPv4 } from '../utils/IPv4';

export const DisplayTypes = [
  'decimal',
  'binary',
]

export default function IPv4Address(props) {

  const { ipString, displayType, seperator } = props;
  if(!IPv4.isValid(ipString)) {
    return <div>Invalid IPv4 address</div>;
  }

  const ipv4 = new IPv4(ipString);

  const display = displayType === 'decimal' ? ipv4.getDecimalString(seperator) : ipv4.getBinaryString(seperator);

  return <p>{display}</p>;
}

IPv4Address.defaultProps = {
  ipString: '0.0.0.0',
  displayType: 'decimal',
  seperator: '.'
}