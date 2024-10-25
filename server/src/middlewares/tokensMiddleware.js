const LogInError = require('../errors/LogInError');
const { verifyAccessToken, verifyRefreshToken } = require('../services');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization }, //'Basic erjh.werewr.werwewr'
    } = req;
    if (authorization) {
      const [, accessToken] = authorization.split(' ');
      req.accessToken = await verifyAccessToken(accessToken);
      return next();
    }
    next(new LogInError()); //error
  } catch (error) {
    next(error);
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    req.refreshToken = await verifyRefreshToken(refreshToken);
    return next();
  } catch (error) {
    next(error);
  }
};
