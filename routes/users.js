const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authenticated, checkRole } = require('../middlewares');

router.use(authenticated, checkRole('admin'));

router
  .get('/', userController.list)
  .post('/', userController.create)
  .put('/:id', userController.update)
  .get('/:id', userController.read)
  .delete('/:id', userController.destroy);

module.exports = router;
