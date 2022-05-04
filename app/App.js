import React from 'react';
import IPv4Address from './components/IPv4Address';
import { IPv4, IPv4Subnetmask } from './utils/IPv4';
import { useState } from 'react';
import IPv4AddressInput from './components/IPv4AddressInput';
import IPv4SubnetInput from './components/IPv4SubnetInput';
import IPv4SubnetStats from './components/IPv4SubnetStats';

export default function App() {
  const [ipUserString, setIpUserString] = useState('');
  const [maskUserString, setMaskUserString] = useState('');
  const [ipv4, setIpv4] = useState(null);
  const [ipv4Subnetmask, setIpv4Subnetmask] = useState(null);

  const handleIpChange = (ip) => {
    console.log('IP changed to: ' + JSON.stringify(ipUserString));
    setIpv4(ip);
  };
  const handleMaskChange = (mask) => {
    setIpv4Subnetmask(mask);
  };

  // return (
  //   <div>
  //     <h1>Hello World</h1>
  //     IP: <IPv4Address ip={ipv4} displayType='decimal' seperator='.'/>
  //     <br />
  //     IP: <IPv4Address ip={ipv4} displayType='binary' seperator=':'/>
  //     <br />
  //     Subnetmask: <IPv4Address ip={ipv4Subnetmask?.ipv4} displayType='decimal' seperator='.' invalidMessage={"Invalid Subnetmask"}/>
  //     <br />
  //     Subnetmask: <IPv4Address ip={ipv4Subnetmask?.ipv4} displayType='binary' seperator=':' invalidMessage={"Invalid Subnetmask"}/>
  //     <br />
  //     <IPv4SubnetInput ip={ipv4} onIpChange={handleIpChange} mask={ipv4Subnetmask} onMaskChange={handleMaskChange}/>
  //   </div>
  // );

  return (
    <div>
      <IPv4SubnetStats />
    </div>
  );
}
