const Project = require('../models/project');
const List = require('../models/list');
const _ = require('lodash');

const getAllProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const userProjects = await Project.find({ userId });
    if (!userProjects.length)
      res.status(404).send({ message: "You haven't created any projects yet." });
    res.status(200).send({ userProjects });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const createProject = async (req, res) => {
  try {
    const { projectTitle } = req.body;
    const project = await Project.find({ userId: req.user._id, projectTitle });
    if (project.length) {
      res.status(409).send({ message: 'Such project already exists' });
      return;
    }
    const newProject = {
      projectTitle,
      userId: req.user._id
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
    const projectLists = await List.find({ projectId: project._id });
    await projectLists.forEach(list => list.remove());
    await project.remove();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updateProject = async (req, res) => {
  try {
    const newProject = req.body;
    const project = await Project.findOne({ _id: newProject._id });
    await project.set({ ...newProject });
    await project.save();
    res.status(200).send(project);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject
};
