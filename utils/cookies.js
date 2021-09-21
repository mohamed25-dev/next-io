import { serialize } from 'cookie';

const cookie = (res, name, value, options = {}) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  options.path = options?.path || '/';

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
}

const cookies = (handler) => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);
  return handler(req, res);
}

export default cookies;