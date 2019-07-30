const Project = require('../models/project');

const getProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ _id: id });
    if (!project) res.status(404).send({ message: "Can't find project with such id" });
    if (String(project.userId) !== String(req.user._id)) {
      res.status(403).send({ message: "Forbidden. It's not your project." });
    }
    req.project = project;
    next();
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = getProject;
