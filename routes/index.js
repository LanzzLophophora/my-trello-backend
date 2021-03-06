const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');
const getUser = require('../middlewares/getUser');
const onlyForAdmin = require('../middlewares/onlyForAdmin');
const getProject = require('../middlewares/getProject');

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
const ProjectController = require('../controllers/project');
const ListController = require('../controllers/list');

router.get('/', (req, res) => res.status(200).json('Test page. Hello, API!'));

router.post('/signup', AuthController.signup);
router.get('/signin', AuthController.signin);

router.get('/user', checkToken, getUser, UserController.getCurrentUser);
router.delete('/user', checkToken, getUser, UserController.makeUserDisable);
router.patch('/user', checkToken, getUser, UserController.updateUser);

router.get('/users', checkToken, getUser, onlyForAdmin, UserController.getAllUsers);

router.get('/users/:id', checkToken, getUser, onlyForAdmin, UserController.getUserById);
router.patch('/users/:id', checkToken, getUser, onlyForAdmin, UserController.updateUserById);
router.delete('/users/:id', checkToken, getUser, onlyForAdmin, UserController.deleteUserById);

router.get('/projects', checkToken, getUser, ProjectController.getAllProjects);
router.post('/projects', checkToken, getUser, ProjectController.createProject);

router.get('/projects/:id', checkToken, getUser, getProject, ProjectController.getProject);
router.patch('/projects/:id', checkToken, getUser, getProject, ProjectController.updateProject);
router.delete('/projects/:id', checkToken, getUser, getProject, ProjectController.deleteProject);

router.get('/projects/:id/lists', checkToken, getUser, getProject, ListController.getAllLists);
router.post('/projects/:id/lists', checkToken, getUser, getProject, ListController.createList);

router.get('/projects/:id/lists/:listId', checkToken, getUser, getProject, ListController.getList);
router.patch(
  '/projects/:id/lists/:listId',
  checkToken,
  getUser,
  getProject,
  ListController.updateList
);
router.delete(
  '/projects/:id/lists/:listId',
  checkToken,
  getUser,
  getProject,
  ListController.deleteList
);

module.exports = router;
