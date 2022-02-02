const express = require('express');
const { list, create, update, read, destroy } = require('../controllers/userController');
const { authenticated } = require('../middlewares');

const router = express.Router();

router.use(authenticated);

router
  .get('/', list)
  .post('/', create)
  .put('/:id', update)
  .get('/:id', read)
  .delete('/:id', destroy);

module.exports = router;
