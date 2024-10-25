const userQueries = require('../controllers/queries/userQueries');
const LogInError = require('../errors/LogInError');
const { verifyAccessToken } = require('../services');

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      headers: { authorization }, //'Basic erjh.werewr.werwewr'
    } = req;
    if (!authorization) {
      return next(new LogInError('need token'));
    }
    const [, accessToken] = authorization.split(' ');
    const tokenData = await verifyAccessToken(accessToken);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    foundUser.password = undefined;
    return res.status(200).send({ data: foundUser });
  } catch (err) {
    next(new TokenError());
  }
};
