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

import TitledContainer from './TitledContainer';
import SplitTableContainer from './SplitTableContainer';
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
    <Container fluid>
      <Row>
        <div className="display-1 mx-auto">IPv4SubnetStats</div>
      </Row>
      <Row>
        <Col>
          <Row>
            <Card style={{ width: '30rem' }}>
              <Card.Header>Input</Card.Header>
              <IPv4SubnetInput
                onIpChange={handleIpChange}
                ipPlaceholder="eg. 192.168.0.1"
                onMaskChange={handleMaskChange}
                maskPlaceholder="eg. /24 or 255.255.0.0"
              />
            </Card>
          </Row>
          <Row>
            <SplitTableContainer title="Binary" align={'left'} rows={binary} />
          </Row>
          <Row>
            <SplitTableContainer
              title="Details"
              align={'left'}
              rows={details}
            />
          </Row>
        </Col>
        <Col className="h-100" md="auto">
          {ip && mask ? <IPv4SubnetSplitter ip={ip} mask={mask} /> : null}
        </Col>
      </Row>
    </Container>
  );
}
