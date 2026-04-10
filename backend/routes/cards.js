const express = require('express');
const router = express.Router();
const { getCards, createCard, deleteCard, dislikeCard, likeCard } = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../utils/validators');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:id', validateCardId, deleteCard);
router.delete('/:id/likes', validateCardId, dislikeCard);
router.put('/:id/likes', validateCardId, likeCard);

module.exports = router;