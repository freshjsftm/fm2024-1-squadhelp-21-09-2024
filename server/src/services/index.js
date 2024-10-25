const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} = require('../constants');

const signJWTPromise = promisify(jwt.sign);
const verifyJWTPromise = promisify(jwt.verify);

/**
 *
 * @param {object} payload - instance User
 * @param {string} secretKey
 * @param {string | number} timeExp
 * @returns {Promise}
 */
const createToken = (payload, { secretKey, timeExp }) => {
  return signJWTPromise(
    {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
    },
    secretKey,
    {
      expiresIn: timeExp,
    }
  );
};
/**
 *
 * @param {object} payload - instance User
 * @returns {Promise}
 */
module.exports.createPairTokens = async (payload) => ({
  access: await createToken(payload, {
    secretKey: ACCESS_TOKEN_SECRET,
    timeExp: ACCESS_TOKEN_TIME,
  }),
  refresh: await createToken(payload, {
    secretKey: REFRESH_TOKEN_SECRET,
    timeExp: REFRESH_TOKEN_TIME,
  }),
});

const verifyToken = (token, { secret }) => verifyJWTPromise(token, secret);

module.exports.verifyAccessToken = (token) =>
  verifyToken(token, { secret: ACCESS_TOKEN_SECRET });
module.exports.verifyRefreshToken = (token) =>
  verifyToken(token, { secret: REFRESH_TOKEN_SECRET });
