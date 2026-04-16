const allowedCors = [
  "http://codetester.twilightparadox.com",
  "http://www.codetester.twilightparadox.com",
  "https://codetester.twilightparadox.com",
  "https://www.codetester.twilightparadox.com",
  "http://localhost:3000",
];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

module.exports.corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);

    if (requestHeaders) {
      res.header("Access-Control-Allow-Headers", requestHeaders);
    }

    return res.end();
  }

  return next();
};