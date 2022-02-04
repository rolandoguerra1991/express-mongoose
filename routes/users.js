const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const middlewares = require('../middlewares');

router.use(middlewares.authenticated, middlewares.checkRole('admin'));

router.get('/', userController.list);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.get('/:id', userController.read);
router.delete('/:id', userController.destroy);

module.exports = router;
