import React from 'react';
import { useState } from 'react';

import IPv4SubnetInput from './IPv4SubnetInput';
import IPv4Address from './IPv4Address';
import {
  getSubnetAddress,
  getBroadcast,
  getFirstHost,
  getLastHost,
} from '../utils/Subnetting';
import { IPv4, IPv4Subnetmask } from '../utils/IPv4';

import TitledContainer from './TitledContainer';
import SplitTableContainer from './SplitTableContainer';
import IPv4SubnetSplitter from './IPv4SubnetSplitter';

export default function IPv4SubnetStats(props) {
  const [ip, setIp] = useState(null);
  const [mask, setMask] = useState(null);

  const handleIpChange = (ip) => {
    setIp(ip);
  };
  const handleMaskChange = (mask) => {
    setMask(mask);
  };

  const details = [
    {
      left: 'subnetmask',
      right: <IPv4Address ip={mask?.ipv4} invalidMessage={'___.___.___.___'} />,
    },
    {
      left: 'subnetaddress',
      right: (
        <IPv4Address
          ip={getSubnetAddress(ip, mask)}
          invalidMessage={'___.___.___.___'}
        />
      ),
    },
    {
      left: 'firsthost',
      right: (
        <IPv4Address
          ip={getFirstHost(ip, mask)}
          invalidMessage={'___.___.___.___'}
        />
      ),
    },
    {
      left: 'lasthost',
      right: (
        <IPv4Address
          ip={getLastHost(ip, mask)}
          invalidMessage={'___.___.___.___'}
        />
      ),
    },
    {
      left: 'broadcast',
      right: (
        <IPv4Address
          ip={getBroadcast(ip, mask)}
          invalidMessage={'___.___.___.___'}
        />
      ),
    },
  ];

  const binary = [
    {
      left: 'IP-Address',
      right: (
        <IPv4Address
          ip={ip}
          displayType={'binary'}
          invalidMessage={'________.________.________.________'}
        />
      ),
    },
    {
      left: 'Subnetmask',
      right: (
        <IPv4Address
          ip={mask?.ipv4}
          displayType={'binary'}
          invalidMessage={'________.________.________.________'}
        />
      ),
    },
  ];

  return (
    <div>
      <h1>IPv4SubnetStats</h1>
      <TitledContainer title="Input">
        <IPv4SubnetInput
          onIpChange={handleIpChange}
          onMaskChange={handleMaskChange}
        />
      </TitledContainer>

      <SplitTableContainer title="Binary" align={'left'} rows={binary} />

      <SplitTableContainer title="Details" align={'left'} rows={details} />

      {ip && mask ? <IPv4SubnetSplitter ip={ip} mask={mask} /> : null}
    </div>
  );
}
