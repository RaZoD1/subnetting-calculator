import React from 'react';
import { useState } from 'react';
import TitledContainer from './TitledContainer';
import IPv4SubnetInput from './IPv4SubnetInput';
import IPv4Address from './IPv4Address';
import { getSubnetAddress, getBroadcast, getFirstHost, getLastHost } from '../utils/Subnetting';
import { IPv4, IPv4Subnetmask } from '../utils/IPv4';

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
      <TitledContainer title="Input">
        <IPv4SubnetInput
          onIpChange={handleIpChange}
          onMaskChange={handleMaskChange}
        />
      </TitledContainer>
      <TitledContainer title="Binary">
        <p>
          IP-Address:&nbsp;
          <IPv4Address ip={ip} displayType={'binary'} seperator={'.'} />
        </p>

        <p>
          Subnetmask:&nbsp;
          <IPv4Address
            ip={mask?.ipv4}
            displayType={'binary'}
            seperator={'.'}
            invalidMessage={'Invalid Subnetmask'}
          />
        </p>
      </TitledContainer>

      <TitledContainer title="Details">
        <p>
          subnetaddress:&nbsp;
          <IPv4Address
            ip={getSubnetAddress(ip, mask)}
            displayType={'decimal'}
            seperator={'.'}
          />
        </p>
        <p>
          subnetmask:&nbsp;
          <IPv4Address
            ip={mask?.ipv4}
            displayType={'decimal'}
            seperator={'.'}
          />
        </p>
        <p>
          first host:&nbsp;
          <IPv4Address
            ip={getFirstHost(ip, mask)}
            displayType={'decimal'}
            seperator={'.'}
          />
        </p>
        <p>
          last host:&nbsp;
          <IPv4Address
            ip={getLastHost(ip, mask)}
            displayType={'decimal'}
            seperator={'.'}
          />
        </p>
        <p>
          broadcast:&nbsp;
          <IPv4Address
            ip={getBroadcast(ip, mask)}
            displayType={'decimal'}
            seperator={'.'}
          />
        </p>
      </TitledContainer>
    </div>
  );
}
