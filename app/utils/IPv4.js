export const regexIPv4 = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
export const regexIPv4PrefixMask = /^\/((3[0-2])|([1-2]?[0-9]))$/;

export class IPv4 {
  constructor(ipString) {
    this.ipString = ipString;
    if (!IPv4.isValid(ipString)) {
      throw new Error('Invalid IPv4 address');
    }
  }

  // returns an array of the octets as strings
  getStringOctets() {
    return this.ipString.split('.');
  }

  // returns an array of integers of the 4 octets
  getDecimalOctets() {
    return this.getStringOctets().map((octet) => {
      return parseInt(octet);
    });
  }

  // return the binary representation of the IPv4 address
  getBinaryString(seperator) {
    seperator = seperator || '.';
    return this.getDecimalOctets()
      .map((octet) => {
        return octet.toString(2).padStart(8, '0');
      })
      .join(seperator);
  }

  // returns the decimal representation of the IPv4 address
  getDecimalString(seperator) {
    seperator = seperator || '.';
    return this.getDecimalOctets().join(seperator);
  }

  // return the bytes of the IPv4 address
  getBytes() {
    return this.getDecimalOctets().reduce((prev, curr) => {
      return prev * 256 + curr;
    }, 0);
  }

  // return a new IPv4 instance from bytes
  static fromBytes(bytes) {
    let filter = 0xff_00_00_00;
    let ipString = '';
    for (let i = 0; i < 4; i++) {
      ipString += ((bytes & filter) >>> ((3 - i) * 8)).toString();
      filter = filter >>> 8;
      if (i < 3) {
        ipString += '.';
      }
    }
    console.log(ipString);
    return new IPv4(ipString);
  }

  // check if the string is a valid IPv4 address
  static isValid(ipString) {
    return ipString.match(regexIPv4);
  }
}

export class IPv4Subnetmask {
  constructor(maskString) {
    this.maskString = maskString;

    if (!this.isValid()) {
      throw new Error('Invalid IPv4 Subnetmask');
    }

    this.format = IPv4.isValid(maskString) ? 'dottedDecimal' : 'prefixLength';
    if (this.format == 'dottedDecimal') {
      this.ipv4 = new IPv4(maskString);
      this.bytes = this.ipv4.getBytes();
    } else if (this.format == 'prefixLength') {
      this.prefixLength = parseInt(maskString.substring(1));
      console.log('PrefixLength: ' + this.prefixLength);
      this.bytes = IPv4Subnetmask.getBytesFromPrefixLength(this.prefixLength);
      console.log('bytes: ' + this.bytes.toString(2));
      this.ipv4 = IPv4.fromBytes(this.bytes);
    }
  }

  /*
   * Pass through methods to the IPv4 object
   */
  getStringOctets = () => this.ipv4.getStringOctets();

  getDecimalOctets = () => this.ipv4.getDecimalOctets();

  getDecimalString = (seperator) => this.ipv4.getDecimalString(seperator);

  getBinaryString = (seperator) => this.ipv4.getBinaryString(seperator);

  // returns if the subnetmask is a valid subnetmask
  isValid() {
    return IPv4Subnetmask.isValid(this.maskString);
  }

  // returns the bytes representing the prefix length
  static getBytesFromPrefixLength(prefixLength) {
    return 0xffff_ffff - (Math.pow(2, 32 - prefixLength) - 1);
  }

  // returns if the string is a valid subnetmask
  static isValid(maskString) {
    if (IPv4.isValid(maskString)) {
      this.ipv4 = new IPv4(maskString);
      let mask = this.ipv4.getBytes();
      console.log('lol: ' + mask.toString(2).padStart(32, '0'));
      let i;
      // check if beginning bits are 1s
      for (i = 31; i >= 0; i--) {
        if ((mask & (1 << i)) == 0) break;
      }
      console.log('i: ' + i);
      // check if ending bits are 0s
      for (; i >= 0; i--) {
        if ((mask & (1 << i)) != 0) return false;
      }
      console.log('Is vlaid');
      return true;
    }
    if (maskString.match(regexIPv4PrefixMask)) {
      //let mask = parseInt(maskString.substring(1));
      return true;
    }
    return false;
  }
}
