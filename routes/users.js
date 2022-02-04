const express = require('express');
const router = express.Router();

const { list, create, update, read, destroy } = require('../controllers/userController');
const { authenticated, checkRole } = require('../middlewares');
const { createUserValidate, updateUserValidate, deleteUserValidate } = require('../validations/users');

router.use(authenticated, checkRole('admin'));

router.get('/', list);
router.post('/', createUserValidate, create);
router.put('/:id', updateUserValidate, update);
router.get('/:id', read);
router.delete('/:id', deleteUserValidate, destroy);

module.exports = router;
