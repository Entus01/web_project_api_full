const express = require('express');
const router = express.Router();
const {getUsers, getUserById, getCurrentUser, updateUser, updateAvatar, createUser} = require('../controllers/users');

router.get('/', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;