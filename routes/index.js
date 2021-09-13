const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const medicineController = require('../controllers/medicine');
const requestController = require('../controllers/request');
const reqmedController = require('../controllers/requestmedicine');

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
router.post(
    '/api/user/update',
    authController.authenticateJWT,
    userController.update
);

// Medicine
router.post(
    '/api/medicine/list',
    authController.authenticateJWT,
    medicineController.list
);
router.post(
    '/api/medicine/add',
    [authController.authenticateJWT, authController.isPharmacist],
    medicineController.add
);
router.post(
    '/api/medicine/update',
    [authController.authenticateJWT, authController.isPharmacist],
    medicineController.update
);
router.post(
    '/api/medicine/delete',
    [authController.authenticateJWT, authController.isPharmacist],
    medicineController.remove
);

// Request
router.post(
    '/api/request/list',
    authController.authenticateJWT,
    requestController.list
);
router.post(
    '/api/request/add',
    authController.authenticateJWT,
    requestController.add
);
router.post(
    '/api/request/update',
    authController.authenticateJWT,
    requestController.update
);
router.post(
    '/api/request/delete',
    authController.authenticateJWT,
    requestController.remove
);

// Requested Medicine
router.post(
    '/api/request-medicine/list',
    authController.authenticateJWT,
    reqmedController.list
);
router.post(
    '/api/request-medicine/add',
    authController.authenticateJWT,
    reqmedController.add
);
router.post(
    '/api/request-medicine/update',
    authController.authenticateJWT,
    reqmedController.update
);
router.post(
    '/api/request-medicine/delete',
    authController.authenticateJWT,
    reqmedController.remove
);

module.exports = router;
