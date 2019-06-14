const Project = require('../models/project');
const _ = require('lodash');

const getAllProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const userProjects = await Project.find({ userId });
    if (!userProjects.length) res.status(404).send({ message: "You haven't created any projects yet." });
    res.status(200).send({ userProjects });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const createProject = async (req, res) => {
  try {
    const { projectTitle } = req.body;
    const project = await Project.find({ userId: req.user._id, projectTitle });
    if (project.length) res.status(409).send({ message: "Such project already exists" });
    const newProject = {
      projectTitle,
      userId: req.user._id,
    };
    await Project.create(newProject);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getProject = async (req, res) => {
  res.status(200).send(req.project);
};

const deleteProject = async (req, res) => {
  try {
    const project = req.project;
    project.remove();
    await project.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updateProject = async (req, res) => {
  try {
    const data = req.body;
    req.project.set(data);
    await req.project.save();
    res.status(200).send(req.project);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getAllLists = async (req, res) => {
  try {
    const lists = _.get(req.project, 'lists');
    if (lists.length > 0) {
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
    if (_.get(project, 'lists')) {
      if (project.lists.find(list => list.listTitle === listTitle)) {
        return res.status(409).send({ message: "Such list already exists" });
      }
      project.lists.push({ listTitle });
      const newList = project.lists.find(list => list.isNew);
      await project.save();
      res.status(200).send({ newList });
    } else {
      res.status(404).send({ message: `Can't find project with id ${id}` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getList = async (req, res) => {
  try {
    const { listId } = req.params;
    if (_.get(req.project, 'lists')) {
      const list = req.project.lists.id(listId);
      if (!list) {
        return res.status(404).send({ message: `Can't find list with id ${listId}` })
      }
      res.status(200).send({ list });
    } else {
      res.status(404).send({ message: "There is no lists in this project" })
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const data = req.body;
    const list = req.project.lists.id(listId);
    if (!list) res.status(404).send({ message: `Can't find list with id ${listId}` });
    const newList = {
      ...list,
      ...data
    };
    req.project.lists.id(listId).set(newList);
    await req.project.save();
    res.status(200).send({ list });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const deleteList = async (req, res) => {
  try {
    const { listId } = req.params;
    if (_.get(req.project, 'lists')) {
      const list = req.project.lists.id(listId);
      if (!list) res.status(404).send({ message: `Can't find list with id ${listId}` });
      list.remove();
      await req.project.save();
      res.sendStatus(200);
    } else {
      res.status(404).send({ message: "There is no lists in this project" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject,
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList
};
