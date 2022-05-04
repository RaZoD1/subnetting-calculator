import React from 'react';

import IPv4AddressInput from './IPv4AddressInput';

export default function IPv4SubnetInput(props){
  const { ipUserString, onIpChange, ipPlaceholder, ipLabel} = props;
  const { prefixUserString, onPrefixChange, prefixPlaceholder, prefixLabel} = props;

  return (
    <div>
      <label>
        {ipLabel}
        <IPv4AddressInput ipUserString={ipUserString} onChange={onIpChange} placeholder={ipPlaceholder} />
      </label>
      <label>
        
      </label>
    </div>
  )
}
IPv4SubnetInput.defaultProps = {
  ipUserString: '',
  onIpChange: () => {},
  ipPlaceholder: 'Enter an IPv4 address',
  ipLabel: 'IPv4 Address',
  prefixUserString: '',
  onPrefixChange: () => {},
  prefixPlaceholder: 'Enter a prefix',
  prefixLabel: 'Prefix',
}