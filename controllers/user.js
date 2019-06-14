const { getUserByIdService, updateUserDataService } = require('../services/UserService');
const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    users && res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) res.status(404).send({ message: "Can't find user with such id" });
    await user.deleteOne({ _id: user.id });
    res.sendStatus( 200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) res.status(404).send({ message: "Can't find user with such id" });
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getCurrentUser = async (req, res) => {
  res.status(200).send(req.user);
};

const makeUserDisable = async (req, res) => {
  try {
    if (req.user.isAdmin) res.status(418).send({ message: "Негоже админу удалять свою учетку!" });
    const result = updateUserDataService(req.user,{ disable: true });
    result && res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updateUser = async (req, res) => {
  try {
    const credentials = req.body;
    const newData = {
      ...req.user,
      ...credentials
    };
    const result = await updateUserDataService(req.user, newData);
    await req.user.save();
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) res.status(404).send({ message: "Can't find user with such id" });
    const newData = {
      ...req.body
    };
    const result = await updateUserDataService(user, newData);
    await user.save();
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
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
