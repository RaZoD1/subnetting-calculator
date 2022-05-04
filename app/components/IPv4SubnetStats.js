import React from 'react';
import { useState } from 'react';
import TitledContainer from './TitledContainer';
import IPv4SubnetInput from './IPv4SubnetInput';

export default function IPv4SubnetStats(props) {
  const [ip, setIp] = useState(null);
  const [mask, setMask] = useState(null);

  const handleIpChange = (ip) => {
    setIp(ip);
  };
  const handleMaskChange = (mask) => {
    setMask(mask);
  };

  return (
    <div>
      <h1>IPv4SubnetStats</h1>
      <TitledContainer title="IPv4 Subnet Calculator">
        <IPv4SubnetInput
          onIpChange={handleIpChange}
          onMaskChange={handleMaskChange}
        />
      </TitledContainer>
    </div>
  );
}
