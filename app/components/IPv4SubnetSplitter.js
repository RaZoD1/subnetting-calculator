import React, { useState } from 'react';
import { IPv4Subnetmask, IPv4 } from '../utils/IPv4';
import {
  getSubnetAddress,
  getSubnetAddressBytes,
  getFirstHost,
  getLastHost,
  getBroadcast,
} from '../utils/Subnetting';
import TitledContainer from './TitledContainer';
import IPv4Address from './IPv4Address';

export default function IPv4SubnetSplitter(props) {
  const { ip, mask } = props;

  const [subnets, setSubnets] = useState([]);
  const [splitUserString, setSplitUserString] = useState('');
  const [nearestValidNets, setNearestValidNets] = useState(0);
  const [inputError, setInputError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSplitUserString(value);

    if (!Number.isInteger(Number(value))) {
      setInputError(true);
      return;
    }
    const amount = parseInt(value);
    if (amount < 1) {
      setInputError(true);
      return;
    }
    calculateSubnets(amount);
  };

  const calculateSubnets = (amount) => {
    const [amountNets, power] = nextPowerOfTwo(amount);

    const subnets = [];
    const subnetMask = new IPv4Subnetmask(
      '/' + (mask.getPrefixLength() + power)
    );
    const hostLength = 32 - subnetMask.getPrefixLength();
    const ogSubnetAddressBytes = getSubnetAddressBytes(ip, mask);

    for (let i = 0; i < amountNets; i++) {
      const subnetAddressBytes = ogSubnetAddressBytes + (i << hostLength);
      const subnetAddress = IPv4.fromBytes(subnetAddressBytes);

      const subnet = {
        subnetAddress: subnetAddress,
        mask: subnetMask.ipv4,
        firstHost: getFirstHost(subnetAddress, subnetMask),
        lastHost: getLastHost(subnetAddress, subnetMask),
        broadcast: getBroadcast(subnetAddress, subnetMask),
      };
      subnets.push(subnet);
    }
    setSubnets(subnets);
    setNearestValidNets(amountNets);
    setInputError(false);
  };

  const nextPowerOfTwo = (number) => {
    for (let i = 0; i < 32; i++) {
      if (Math.pow(2, i) >= number) {
        return [Math.pow(2, i), i];
      }
    }
    return [0, 0];
  };

  return (
    <TitledContainer title={'Subnet Splitter'}>
      <div>{props.ip.getBytes()}</div>
      <div>
        <label>
          Amount of subnets&nbsp;
          <input
            type="text"
            onChange={handleChange}
            value={splitUserString}
            style={inputError ? { color: 'red', fontWeight: 'bold' } : {}}
          />{' '}
          <span>({nearestValidNets})</span>
        </label>
      </div>
      <div>
        <table style={{ borderCollapse: 'separate', borderSpacing: '50px 0' }}>
          <thead>
            <tr>
              <td>Nr.</td>
              <td>Subnetmask</td>
              <td>Subnetaddress</td>
              <td>First Host</td>
              <td>Last Host</td>
              <td>Broadcast Address</td>
            </tr>
          </thead>
          <tbody>
            {subnets.map((subnet, index) => {
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
            })}
          </tbody>
        </table>
      </div>
    </TitledContainer>
  );
}
IPv4SubnetSplitter.defaultProps = {
  ip: null,
  mask: null,
};
