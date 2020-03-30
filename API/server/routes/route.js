const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const serviceController = require('../controllers/serviceController');
const serverController = require('../controllers/serverController');

router.post('/service/deploy', userController.allowIfLoggedin, serviceController.deployService );

router.get('/one/version', serverController.getVersion);
router.post('/one/reboot', serverController.getVersion);
router.post('/one/version', serverController.getVersion);
router.post('/one/version', serverController.getVersion);
router.post('/one/version', serverController.getVersion);

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;
