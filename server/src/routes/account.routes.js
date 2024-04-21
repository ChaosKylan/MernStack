const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/verifyToken.middleware');

const {
  updateAccount,
  deleteAccount,
} = require('../controllers/account.controller');

router.put('/update', verifyToken, updateAccount);

router.delete('/delete', verifyToken, deleteAccount);

module.exports = router;
