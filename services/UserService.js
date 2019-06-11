const User = require('../models/user');

getUserByTokenService = async (token) => {
  const { _id } = token;

  try {
    var user = await User.findOne({ _id }, {password: 0});
    if (!user.isAdmin) {
      return user;
    }
    return await User.findOne({ _id });
  } catch (e) {
    throw e;
  }
};

getUserByIdService = async (_id) => {
  try {
    var user = await User.findOne({ _id });
  } catch (e) {
    throw e;
  }

  return user;
};

updateUserDataService = async (user, newData) => {

  try {
    User.findOneAndUpdate({ _id: user.id }, { ...newData }, (err) => {
      if (err) {
        console.error("error", err);
        return err;
      }
    })
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUserByTokenService,
  getUserByIdService,
  updateUserDataService
};
