import React from 'react';

import IPv4AddressInput from './IPv4AddressInput';
import IPv4MaskInput from './IPv4MaskInput';

import Form from 'react-bootstrap/Form';

export default function IPv4SubnetInput(props) {
  const { onIpChange, ipPlaceholder, ipLabel } = props;
  const { onMaskChange, maskPlaceholder, maskLabel } = props;

  return (
    <Form>
      <Form.Group>
        <Form.Label>{ipLabel}</Form.Label>
        <IPv4AddressInput onChange={onIpChange} placeholder={ipPlaceholder} />
      </Form.Group>
      <Form.Group>
        <Form.Label>{maskLabel}</Form.Label>
        <IPv4MaskInput onChange={onMaskChange} placeholder={maskPlaceholder} />
      </Form.Group>
    </Form>
  );
}
IPv4SubnetInput.defaultProps = {
  onIpChange: () => {},
  ipPlaceholder: 'Enter an IPv4 Address',
  ipLabel: 'IPv4 Address',

  onMaskChange: () => {},
  maskPlaceholder: 'Enter an IPv4 Subnetmask',
  maskLabel: 'Subnetmask',
};
