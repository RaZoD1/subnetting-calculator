export const regexIPv4 = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;

export class IPv4 {
  constructor(ipString) {
    this.ipString = ipString;
    if(!IPv4.isValid(ipString)) {
      throw new Error("Invalid IPv4 address");
    }
    
  }

  get octets() {
    return this.ipString.split(".");
  }


  get binary() {
    return this.octets.map(octet => {
      return parseInt(octet).toString(2);
    });
  }
  getBinaryString(seperator) {
    return this.binary.join(seperator);
  }

  get decimal() {
    return this.octets.map(octet => {
      return parseInt(octet);
    }
    );
  }
  getDecimalString(seperator) {
    return this.decimal.join(seperator);
  }


  static isValid(ipString) {
    return ipString.match(regexIPv4);
  }

}