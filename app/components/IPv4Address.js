import React from 'react';
import { IPv4 } from '../utils/IPv4';

export const DisplayTypes = ['decimal', 'binary'];

export default function IPv4Address(props) {
  const { ipString, displayType, seperator, ip, invalidMessage } = props;

  let ipv4 = null;
  if (!(ip instanceof IPv4)) {
    if (!IPv4.isValid(ipString)) {
      return (
        <div className="d-inline-block font-monospace">{invalidMessage}</div>
      );
    }

    ipv4 = new IPv4(ipString);
  } else {
    ipv4 = ip;
  }

  const displayText =
    displayType === 'decimal'
      ? ipv4
          .getDecimalString(seperator)
          .split('.')
          // fill each octet with spaces to fill 3 digits
          // .map((s) => s.padStart(3, String.fromCharCode(160)))
          .join('.')
      : ipv4.getBinaryString(seperator);
  return <div className="d-inline-block font-monospace">{displayText}</div>;
}

IPv4Address.defaultProps = {
  ipString: '',
  displayType: 'decimal',
  seperator: '.',
  ip: null,
  invalidMessage: 'Invalid IPv4 address',
};
