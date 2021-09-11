const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// Auth
router.post(
  '/api/register',
  authController.checkDuplicateEmail,
  authController.register
);
router.post('/api/login', authController.login);
router.post(
  'api//logout',
  authController.authenticateJWT,
  authController.logout
);

// User
router.post(
  '/api/user/list',
  authController.authenticateJWT,
  userController.list
);

module.exports = router;
