const express = require('express');
const router = express.Router();
const {getUsers, getUserById, getCurrentUser} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/me', getCurrentUser);

module.exports = router;