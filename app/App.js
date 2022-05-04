import React from "react";
import IPv4Address from "./components/IPv4Address";
import { IPv4 } from "./utils/IPv4";
import { useState } from "react";
import IPv4Input from "./components/IPv4Input";

export default function App() {

  const [ipUserString, setIpUserString] = useState("");
  const [ipv4, setIpv4] = useState(null);

  const handleChange = (ipUserString) => {
    setIpUserString(ipUserString);
    if(IPv4.isValid(ipUserString)) {
      setIpv4(new IPv4(ipUserString));
    }else {
      setIpv4(null);
    }
  }
  console.log(ipv4);
  return (
    <div>
      <h1>Hello World</h1>
      <IPv4Address ip={ipv4} displayType='decimal' seperator='.'/>
      <br />
      <IPv4Address ip={ipv4} displayType='binary' seperator=':'/>
      <br />
      <IPv4Input ipUserString={ipUserString} onChange={handleChange}/>
    </div>
  );
}