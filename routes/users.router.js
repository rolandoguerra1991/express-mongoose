const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticated, passwordResetToken, verifyEmailToken } = require('../middlewares');

const router = express.Router();

router.get('/', authenticated, userController.list);
router.post('/', authenticated, userController.create);
router.put('/:id', authenticated, userController.update);
router.get('/:id', authenticated, userController.read);
router.delete('/:id', authenticated, userController.destroy);

module.exports = router;
