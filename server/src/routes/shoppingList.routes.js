/*
CRUD Operationen (Create, Read, Update, Delete)
*/

const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/verifyToken.middleware');

const {
  getShoppingLists,
  getShoppingListById,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} = require('../controllers/shoppingList.controller');

router.get('/', verifyToken, getShoppingLists);
router.get('/:id', verifyToken, getShoppingListById);

router.post('/create', verifyToken, createShoppingList);

router.put('/:id', verifyToken, updateShoppingList);

router.delete('/:shoppingListId', verifyToken, deleteShoppingList);

module.exports = router;
