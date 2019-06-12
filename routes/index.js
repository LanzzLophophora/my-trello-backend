const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');
const getUser = require('../middlewares/getUser');
const onlyForAdmin = require('../middlewares/onlyForAdmin');


const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');

router.post('/signup', AuthController.signup);
router.get('/signin', AuthController.signin);

router.get('/user', checkToken, UserController.getCurrentUser);
router.delete('/user', checkToken, getUser, UserController.makeUserDisable);
router.put('/user', checkToken, getUser, UserController.updateUser);

router.get('/users', checkToken, getUser, onlyForAdmin, UserController.getAllUsers);

router.get('/users/:id', checkToken, getUser, onlyForAdmin, UserController.getUserById);
router.delete('/users/:id', checkToken, getUser, onlyForAdmin, UserController.deleteUserById);
router.put('/users/:id', checkToken, getUser, onlyForAdmin, UserController.updateUserById);


module.exports = router;
