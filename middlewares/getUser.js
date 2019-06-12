const { getUserByTokenService } = require('../services/UserService');

const getUser = async (req, res, next) => {
  var { token } = req;
  try {
    var user = await getUserByTokenService(token);
  } catch ({ message }) {
    return next ({
      status: 500,
      message: 'dwaddaw'
    });
  }
  req.user = user;

  next();
};

module.exports = getUser;
