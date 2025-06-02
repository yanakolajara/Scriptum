import { parseCookies } from '../../../utils/cookieUtils';

describe('parseCookies', () => {
  it('should parse cookies correctly', () => {
    const cookies = 'cookie1=value1; cookie2=value2';
    const result = parseCookies(cookies);
    expect(result).toEqual({ cookie1: 'value1', cookie2: 'value2' });
  });
});
