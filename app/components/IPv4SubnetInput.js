import React from 'react';

import IPv4AddressInput from './IPv4AddressInput';
import IPv4MaskInput from './IPv4MaskInput';
import SplitTable from './SplitTable';

export default function IPv4SubnetInput(props) {
  const { onIpChange, ipPlaceholder, ipLabel } = props;
  const { onMaskChange, maskPlaceholder, maskLabel } = props;

  const ipId = Math.random().toString(36).substring(2, 12);
  const maskId = Math.random().toString(36).substring(2, 12);

  const rows = [
    {
      left: <label htmlFor={ipId}>{ipLabel}</label>,
      right: (
        <IPv4AddressInput
          id={ipId}
          onChange={onIpChange}
          placeholder={ipPlaceholder}
        />
      ),
    },
    {
      left: <label htmlFor={maskId}>{maskLabel}</label>,
      right: (
        <IPv4MaskInput
          id={maskId}
          onChange={onMaskChange}
          placeholder={maskPlaceholder}
        />
      ),
    },
  ];

  return (
    <div>
      <SplitTable rows={rows} />
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
