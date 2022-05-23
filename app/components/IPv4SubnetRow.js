import React from 'react';

import IPv4Address from './IPv4Address';

export default function IPv4SubnetRow(props) {
  const { subnet, index } = props;
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <IPv4Address ip={subnet.mask} />
      </td>
      <td>
        <IPv4Address ip={subnet.subnetAddress} />
      </td>
      <td>
        <IPv4Address ip={subnet.firstHost} />
      </td>
      <td>
        <IPv4Address ip={subnet.lastHost} />
      </td>
      <td>
        <IPv4Address ip={subnet.broadcast} />
      </td>
    </tr>
  );
}

IPv4SubnetRow.defaultProps = {
  subnet: {},
  index: 0,
};
