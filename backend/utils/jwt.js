const { JWT_SECRET } = process.env;

module.exports.getJwtSecret = () => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined. Add it to your .env file.');
  }
  return JWT_SECRET;
};