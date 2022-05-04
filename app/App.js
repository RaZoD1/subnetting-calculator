import React from "react";
import IPv4Address from "./components/IPv4Address";
import { IPv4, IPv4Subnetmask } from "./utils/IPv4";
import { useState } from "react";
import IPv4AddressInput from "./components/IPv4AddressInput";
import IPv4SubnetInput from "./components/IPv4SubnetInput";

export default function App() {

  const [ipUserString, setIpUserString] = useState("");
  const [maskUserString, setMaskUserString] = useState("");
  const [ipv4, setIpv4] = useState(null);
  const [ipv4Subnetmask, setIpv4Subnetmask] = useState(null);

  const handleIpChange = (ipUserString) => {
    setIpUserString(ipUserString);
    if(IPv4.isValid(ipUserString)) {
      setIpv4(new IPv4(ipUserString));
    }else {
      setIpv4(null);
    }
  }
  const handleMaskChange = (maskUserString) => {
    setMaskUserString(maskUserString);
    if(IPv4Subnetmask.isValid(maskUserString)) {
      setIpv4Subnetmask(new IPv4Subnetmask(maskUserString));
    }else{
      setIpv4Subnetmask(null);
    }
  } 

  return (
    <div>
      <h1>Hello World</h1>
      <IPv4Address ip={ipv4} displayType='decimal' seperator='.'/>
      <br />
      <IPv4Address ip={ipv4} displayType='binary' seperator=':'/>
      <br />
      <IPv4SubnetInput ipUserString={ipUserString} onIpChange={handleIpChange} maskUserString={maskUserString} onMaskChange={handleMaskChange}/>
    </div>
  );
}