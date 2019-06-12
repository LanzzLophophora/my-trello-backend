const { getUserByTokenService, getUserByIdService, updateUserDataService } = require('../services/UserService');
const User = require('../models/user');

const getAllUsers = async (req, res, next) => {
  try {
    var users = await User.find(function (err, users) {
       if (err) return console.error(err);
       return users
      });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json(users);
};

const deleteUserById = async (req, res, next) => {
  try {
    var user = await getUserByIdService(req.params.id);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  if (!user) {
    return next({
      status: 404,
      message: "Not found!"
    });
  }

  try {
    var result = await user.deleteOne({_id: user.id });
  } catch (e) {
    return next({
      status: 500,
      message
    });
  }

  return res.sendStatus( 200);
};

const getUserById = async (req, res, next) => {
  try {
    var user = await getUserByIdService(req.params.id);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json(user);
};

const getCurrentUser = async (req, res, next) => {
  const { token } = req;

  try {
    var user = await getUserByTokenService(token);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json(user);
};

const makeUserDisable = async (req, res, next) => {
  if (req.user.isAdmin) {
    return next({
      status: 418,
      message: "Негоже админу удалять свою учетку!"
    });
  }

  try {
    var result = updateUserDataService(req.user, {
      disable: true
    });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return  res.json({ message: 'success' });
};

const updateUser = async (req, res, next) => {
  const newData = {
    ...req.body
  };

  try {
    var result = updateUserDataService(req.user, newData);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return  res.send(result);
};

const updateUserById = async (req, res, next) => {

  try {
    var user = await getUserByIdService(req.params.id);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  const newData = {
    ...req.body
  };

  try {
    var result = updateUserDataService(user, newData);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return  res.send(result);
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  makeUserDisable,
  updateUser,
  deleteUserById,
  getUserById,
  updateUserById
};
