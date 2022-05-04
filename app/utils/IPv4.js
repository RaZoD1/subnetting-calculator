export const regexIPv4 = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;

export class IPv4 {
  constructor(ipString) {
    this.ipString = ipString;
    if(!IPv4.isValid(ipString)) {
      throw new Error("Invalid IPv4 address");
    }
  }

  getStringOctets() {
    return this.ipString.split(".");
  }
  
  getDecimalOctets() {
    return this.getStringOctets().map(octet => {
      return parseInt(octet);
    }
    );
  }

  getBinaryString(seperator) {
    seperator = seperator || '.';
    return this.getDecimalOctets().map(octet => {
      return octet.toString(2).padStart(8, '0');
    }).join(seperator);
  }

  getDecimalString(seperator) {
    seperator = seperator || '.';
    return this.getDecimalOctets().join(seperator);
  }

  getBytes(){
    return this.getDecimalOctets.reduce((prev, curr) => {
      return prev * 256 + curr;
    }, 0);
  }

  static fromBytes(bytes) {
    let ipString = '';
    let i;
    for(i = 0; i < 4; i++){
      ipString += bytes >>> (i * 8) & 0xff;
      if(i !== 3) {
        ipString += '.';
      }
    }
    return new IPv4(ipString);
  }

  static isValid(ipString) {
    return ipString.match(regexIPv4);
  }
  
}

export class IPv4Subnetmask{
  constructor(maskString) {
    this.maskString = maskString;

    if(!this.isValid()) {
      throw new Error("Invalid IPv4 Subnetmask");
    }

    this.format = IPv4.isValid(maskString) ? 'dottedDecimal' : 'prefixLength';
    if(this.format == 'dottedDecimal') {
      console.log("Dotted");
      this.ipv4 = new IPv4(maskString);
      this.bytes = this.ipv4.getBytes();
    } else if(this.format == 'prefixLength') {
      this.prefixLength = parseInt(maskString);
      this.bytes = IPv4Subnetmask.getBytesFromPrefixLength(this.prefixLength);
      this.ipv4 = IPv4.fromBytes(this.bytes);
    }
  }

  getStringOctets = () => this.ipv4.getStringOctets();

  getDecimalOctets = () => this.ipv4.getDecimalOctets();

  getDecimalString = (seperator) => this.ipv4.getDecimalString(seperator);

  getBinaryString = (seperator) => this.ipv4.getBinaryString(seperator);
  
  isValid(){
    return IPv4Subnetmask.isValid(this.maskString);
  }
  
  static getBytesFromPrefixLength(prefixLength) {
    return Math.pow(2, prefixLength-1) << (32 - prefixLength);
  }

  static isValid(maskString) {
    if(IPv4.isValid(maskString)){
      this.ipv4 = new IPv4(maskString);
      let mask = this.ipv4.getBytes();
      
      let i;
      // check if beginning bits are 1s
      for(i = 31; i >= 0; i--){
        if(mask & (1 << i) == 0)
          break;
      }
      // check if ending bits are 0s
      for(; i>= 0; i--){
        if(mask & (1 << i) != 0)
          return false;
      }
      return true;
      
    }
    if(!isNaN(maskString)){
      let mask = parseInt(maskString);
      return mask >= 0 && mask <= 32;
    }
    return false;
  }
}
