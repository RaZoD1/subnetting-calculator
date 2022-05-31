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

import SplitTable from './SplitTable';
import IPv4SubnetSplitter from './IPv4SubnetSplitter';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
      left: 'Subnet-Mask',
      right: <IPv4Address ip={mask?.ipv4} invalidMessage={'___.___.___.___'} />,
    },
    {
      left: 'Subnet-Address',
      right: (
        <IPv4Address
          ip={getSubnetAddress(ip, mask)}
          invalidMessage={'___.___.___.___'}
        />
      ),
    },
    {
      left: 'First Host',
      right: (
        <IPv4Address
          ip={getFirstHost(ip, mask)}
          invalidMessage={'___.___.___.___'}
        />
      ),
    },
    {
      left: 'Last Host',
      right: (
        <IPv4Address
          ip={getLastHost(ip, mask)}
          invalidMessage={'___.___.___.___'}
        />
      ),
    },
    {
      left: 'Broadcast-Address',
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
    <Container fluid>
      <Row>
        <div className="display-1 text-center">IPv4SubnetStats</div>
      </Row>
      <Row sm={1} md={2}>
        <Col>
          <Row>
            <Container>
              <Card>
                <Card.Header>Input</Card.Header>
                <Card.Body>
                  <IPv4SubnetInput
                    onIpChange={handleIpChange}
                    ipPlaceholder="eg. 192.168.0.1"
                    onMaskChange={handleMaskChange}
                    maskPlaceholder="eg. /24 or 255.255.0.0"
                  />
                </Card.Body>
              </Card>
            </Container>
          </Row>
          <Row>
            <Container>
              <Card>
                <Card.Header>Binary</Card.Header>
                <SplitTable rows={binary} align={'left'} />
              </Card>
            </Container>
          </Row>
          <Row>
            <Container>
              <Card>
                <Card.Header>Details</Card.Header>
                <SplitTable rows={details} align={'left'} />
              </Card>
            </Container>
          </Row>
        </Col>
        <Col className="h-100 overflow-hidden">
          {ip && mask ? <IPv4SubnetSplitter ip={ip} mask={mask} /> : null}
        </Col>
      </Row>
    </Container>
  );
}
