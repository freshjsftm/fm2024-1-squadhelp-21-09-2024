const { createPairTokens } = require('../services');
const { User, RefreshToken } = require('../models');
const { MAX_DEVICES } = require('../constants');
const BadRequestError = require('../errors/BadRequestError');
const TokenError = require('../errors/TokenError');

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const pairTokens = await createPairTokens(user);
      await user.createRefreshToken({ token: pairTokens.refresh });
      user.password = undefined;
      return res.status(201).send({ data: { user, pairTokens } });
    }
    next(new BadRequestError()); //error
  } catch (error) {
    next(error);
  }
};
module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ where: { email } });
    if (user && (await user.comparePassword(password))) {
      const pairTokens = await createPairTokens(user);
      if ((await user.countRefreshTokens()) >= MAX_DEVICES) {
        const [oldestToken] = await user.getRefreshTokens({
          order: [['updatedAt', 'ASC']],
        });
        await oldestToken.update({ token: pairTokens.refresh });
      } else {
        await user.createRefreshToken({ token: pairTokens.refresh });
      }
      user.password = undefined;
      return res.status(200).send({ data: { user, pairTokens } });
    }
    next(new LogInError());
  } catch (error) {
    next(error);
  }
};
module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const instanceRefreshToken = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if(!instanceRefreshToken){
      return next(new TokenError());
    }
    const user = await instanceRefreshToken.getUser();
    const pairTokens = await createPairTokens(user);
    await instanceRefreshToken.update({ token: pairTokens.refresh });
    user.password = undefined;
    res.status(200).send({ data: { user, pairTokens } });
  } catch (error) {
    next(error);
  }
};
