import React from 'react';

import IPv4AddressInput from './IPv4AddressInput';
import IPv4MaskInput from './IPv4MaskInput';

export default function IPv4SubnetInput(props){
  const { ipUserString, onIpChange, ipPlaceholder, ipLabel} = props;
  const { maskUserString, onMaskChange, maskPlaceholder, maskLabel} = props;

  return (
    <div>
      <label>
        {ipLabel} &nbsp;
        <IPv4AddressInput ipUserString={ipUserString} onChange={onIpChange} placeholder={ipPlaceholder} />
        
      </label>
      <br />
      <label>
        {maskLabel} &nbsp;
        <IPv4MaskInput maskUserString={maskUserString} onChange={onMaskChange} placeholder={maskPlaceholder} />
      </label>
    </div>
  )
}
IPv4SubnetInput.defaultProps = {
  ipUserString: '',
  onIpChange: () => {},
  ipPlaceholder: 'Enter an IPv4 Address',
  ipLabel: 'IPv4 Address',
  maskUserString: '',
  onMaskChange: () => {},
  maskPlaceholder: 'Enter an IPv4 Subnetmask',
  maskLabel: 'Subnetmask',
}