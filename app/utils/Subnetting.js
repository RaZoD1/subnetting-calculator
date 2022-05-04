import { IPv4, IPv4Subnetmask } from './IPv4';

export function getSubnetAddressBytes(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;

  const ipBytes = ip.getBytes();
  const maskBytes = mask.getBytes();

  const subnetAddress = (ipBytes & maskBytes) >>> 0; ;
  return subnetAddress;
}
export function getSubnetAddress(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;

  const subnetAddress = getSubnetAddressBytes(ip, mask);

  return new IPv4.fromBytes(subnetAddress);
}

export function getBroadcastBytes(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;

  const ipBytes = ip.getBytes();
  const maskBytes = mask.getBytes();

  const broadcastBytes = (ipBytes | ~maskBytes) >>> 0;
  return broadcastBytes;
}
export function getBroadcast(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;

  const broadcast = getBroadcastBytes(ip, mask);

  return new IPv4.fromBytes(broadcast);
}

export function getFirstHostBytes(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;

  const subnetAddressBytes = getSubnetAddressBytes(ip, mask);

  const firstHostBytes = (subnetAddressBytes + 0b1) >>> 0;
  return firstHostBytes;
}
export function getFirstHost(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;
  
  const firstHost = getFirstHostBytes(ip, mask);
  return new IPv4.fromBytes(firstHost);
}

export function getLastHostBytes(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;

  const broadcastBytes = getBroadcastBytes(ip, mask);

  const lastHostBytes = (broadcastBytes - 0b1) >>> 0;
  return lastHostBytes;
}
export function getLastHost(ip, mask) {
  if (!(ip instanceof IPv4 && mask instanceof IPv4Subnetmask)) return null;

  const lastHost = getLastHostBytes(ip, mask);

  return new IPv4.fromBytes(lastHost);
}