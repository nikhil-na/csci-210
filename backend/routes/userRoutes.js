const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const authController = require('../controllers/authControllers');

router.get('/dashboard', requireAuth, authController.get_dashboard);
router.post('/signup', authController.post_signup);
router.post('/login', authController.post_login);
router.get('/logout', authController.get_logout);

module.exports = router;