import React from "react";
import IPv4Address from "./components/IPv4Address";

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <IPv4Address ipString='192.168.8.1' displayType='decimal' seperator=':'/>
    </div>
  );
}