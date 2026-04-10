const express = require('express');
const router = express.Router();
const {getUsers, getUserById, getCurrentUser, updateUser, updateAvatar } = require('../controllers/users');
const {
	validateUserId,
	validateUpdateUser,
	validateUpdateAvatar,
} = require('../utils/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;