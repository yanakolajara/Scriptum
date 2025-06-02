export function parseCookies(cookie) {
  return cookie
    .split(';')
    .map((cookie) => cookie.split('='))
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = value;
      return acc;
    }, {});
}
