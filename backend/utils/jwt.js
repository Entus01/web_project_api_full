const { NODE_ENV, JWT_SECRET } = process.env;

const DEFAULT_JWT_SECRET = 'dev-secret';

module.exports.getJwtSecret = () => (
  NODE_ENV === 'production' ? JWT_SECRET : DEFAULT_JWT_SECRET
);