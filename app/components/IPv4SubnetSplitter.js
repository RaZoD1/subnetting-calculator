import React, { useState, useEffect } from 'react';
import { IPv4Subnetmask, IPv4 } from '../utils/IPv4';
import {
  getSubnetAddress,
  getSubnetAddressBytes,
  getFirstHost,
  getLastHost,
  getBroadcast,
} from '../utils/Subnetting';
import IPv4SubnetRow from './IPv4SubnetRow';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

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

  useEffect(() => {
    calculateSubnets(nearestValidNets);
  }, [ip, mask]);

  const controlClasses = [];
  if (!inputError && splitUserString != '') controlClasses.push('is-valid');
  if (inputError && splitUserString != '') controlClasses.push('is-invalid');

  return (
    <Card style={{ width: 'max-content' }}>
      <Card.Header>Subnet Splitter</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Form>
            <Form.Group>
              <Form.Label>Amount of Subnets</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount of Subnets"
                value={splitUserString}
                onChange={handleChange}
                className={controlClasses.join(' ')}
              />
              <Form.Text>{nearestValidNets}</Form.Text>
            </Form.Group>
          </Form>
        </ListGroup.Item>
      </ListGroup>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Subnetmask</th>
              <th>Subnetaddress</th>
              <th>First Host</th>
              <th>Last Host</th>
              <th>Broadcast Address</th>
            </tr>
          </thead>
          <tbody>
            {subnets.map((subnet, index) => (
              <IPv4SubnetRow subnet={subnet} index={index} />
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
IPv4SubnetSplitter.defaultProps = {
  ip: null,
  mask: null,
};
