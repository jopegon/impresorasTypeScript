

import { isValidIp } from '../../src/controler/controlerRegistro';

describe('isValidIp', () => {
  it('should return true for valid IPv4 addresses', () => {
    expect(isValidIp('192.168.0.1')).toBe(true);
    expect(isValidIp('255.255.255.255')).toBe(true);
    expect(isValidIp('0.0.0.0')).toBe(true);
    expect(isValidIp('10.0.1.5')).toBe(true);
  });

  it('should return false for invalid IPs', () => {
    expect(isValidIp('256.100.50.25')).toBe(false); // >255
    expect(isValidIp('192.168.0')).toBe(false);     // too few parts
    expect(isValidIp('192.168')).toBe(false);     // too few parts
    expect(isValidIp('192.')).toBe(false);     // too few parts
    expect(isValidIp('abc.def.ghi.jkl')).toBe(false);
    expect(isValidIp('1234.1.1.1')).toBe(false);    // too large number
    expect(isValidIp('')).toBe(false);
    expect(isValidIp(' 192.168.0.1 ')).toBe(false); // spaces
  });
});