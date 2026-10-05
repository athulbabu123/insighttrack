const express = require('express');
const {getAllUsers, deleteUserById, getTransactions, getUserData, getUpdatedTransactions} = require('../controllers/admin-controller');
const router = express.Router();

router.route('/users').get(getAllUsers);

router.route('/users/delete/:id').delete(deleteUserById);

router.route('/users/view/:id').get(getTransactions);

router.route('/users/view/transactions/:id').get(getUpdatedTransactions);

router.route('/users/data/:id').get(getUserData);

module.exports = router;