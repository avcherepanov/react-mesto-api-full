const allowedCors = [
  'avcherepanov.students.nomorepartiesxyz.ru',
  'localhost:3000',
  'http://localhost:3000',
  'http://avcherepanov.students.nomorepartiesxyz.ru',
  'https://avcherepanov.students.nomorepartiesxyz.ru',
  'https://localhost:3000',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send();
    return;
  }
  next();
});
