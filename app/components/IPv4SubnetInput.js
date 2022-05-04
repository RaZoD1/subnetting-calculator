import React from 'react';

import IPv4AddressInput from './IPv4AddressInput';
import IPv4MaskInput from './IPv4MaskInput';

export default function IPv4SubnetInput(props) {
  const { onIpChange, ipPlaceholder, ipLabel } = props;
  const { onMaskChange, maskPlaceholder, maskLabel } = props;

  return (
    <div>
      <label>
        <IPv4AddressInput onChange={onIpChange} placeholder={ipPlaceholder} />
        &nbsp;{ipLabel}
      </label>
      <br />
      <label>
        <IPv4MaskInput onChange={onMaskChange} placeholder={maskPlaceholder} />
        &nbsp;{maskLabel}
      </label>
    </div>
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
