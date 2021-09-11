const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// Auth
router.post(
  '/register',
  authController.checkDuplicateEmail,
  authController.register
);
router.post('/login', authController.login);
router.post('/logout', authController.authenticateJWT, authController.logout);

module.exports = router;
