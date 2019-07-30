const List = require('../models/list');
const _ = require('lodash');

const getAllLists = async (req, res) => {
  try {
    const lists = await List.find({ projectId: req.project._id });
    if (!_.isEmpty(lists)) {
      res.status(200).send({ lists });
    } else {
      res.status(404).send({ message: "You haven't created any lists yet." });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const createList = async (req, res) => {
  try {
    const { listTitle } = req.body;
    const project = req.project;
    if (List.find({ listTitle }).length) {
      return res.status(409).send({ message: 'Such list already exists' });
    }
    const list = await List.create({
      listTitle,
      projectId: req.project._id,
      cardList: []
    });
    project.lists.push(list._id);
    await project.save();

    res.status(200).send(list);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getList = async (req, res) => {
  try {
    const _id = req.params.listId;
    const list = await List.findOne({ _id });
    if (!list) {
      return res.status(404).send({ message: `Can't find list with id ${listId}` });
    } else {
      res.status(200).send(list);
    }
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).send({ error });
  }
};

const updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const newList = req.body;
    const list = await List.findOne({ _id: listId });
    await list.set(newList);
    await list.save();
    res.status(200).send({ list });
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error });
  }
};

const deleteList = async (req, res) => {
  try {
    const { listId } = req.params;
    await List.deleteOne({ _id: listId });
    req.project.lists = req.project.lists.filter(list => list._id !== listId);
    await req.project.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList
};
