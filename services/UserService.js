const User = require('../models/user');

getUserByTokenService = async (token) => {
  const { _id } = token;

  try {
    const user = await User.findOne({ _id }, {password: 0});
    if (!user) return;
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
    const user = await User.findOne({ _id });
    if (!user) return;
    return user;
  } catch (e) {
    throw e;
  }
};

updateUserDataService = async (user, newData) => {
  try {
    await user.set({...newData});
    await user.save();
    return user;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUserByTokenService,
  getUserByIdService,
  updateUserDataService
};
