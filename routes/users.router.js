const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.list);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.get('/:id', userController.read);
router.delete('/:id', userController.destroy);

module.exports = router;
