const express = require('express');
const router = express.Router();
const { getCards, createCard, deleteCard, dislikeCard, likeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.delete('/:id/likes', dislikeCard);
router.put('/:id/likes', likeCard);

module.exports = router;