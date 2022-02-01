const express = require('express');
const { list, create, update, read, destroy } = require('../controllers/userController');
const { authenticated } = require('../middlewares');

const router = express.Router();

router.get('/', [authenticated], list);
router.post('/', [authenticated], create);
router.put('/:id', [authenticated], update);
router.get('/:id', [authenticated], read);
router.delete('/:id', [authenticated], destroy);

module.exports = router;
