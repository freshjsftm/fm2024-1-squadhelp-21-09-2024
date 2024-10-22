const { User } = require('../models');
/*
{
  accessToken: sgd.fhgadf.agh, //2min
  refreshToken: qwe.dsfdsf.ddd, //5d
}
*/

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    if (newUser) {
      // create two tokens
      // response user with two tokens
    }
    next(); //error
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
    if (user) { //compare password
      // create two tokens
      // response user with two tokens
    }
    next(); //error
  } catch (error) {
    next(error);
  }
};
module.exports.refresh = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
