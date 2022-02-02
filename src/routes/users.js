const express = require('express');
const { list, create, update, read, destroy } = require('../controllers/userController');
const { authenticated, checkRole } = require('../middlewares');

const router = express.Router();

router.use(authenticated, checkRole('admin'));

router
  .get('/', list)
  .post('/', create)
  .put('/:id', update)
  .get('/:id', read)
  .delete('/:id', destroy);

module.exports = router;
