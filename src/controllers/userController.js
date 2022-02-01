const catchRequest = require('../utils/catchRequest');
const { userService } = require('../services');

const list = catchRequest(async (req, res) => {
  const users = await userService.query(req.query);
  res.json(users);
});

const create = catchRequest(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.json(user);
});

const update = catchRequest(async (req, res) => {
  await userService.updateUser({ _id: req.params.id }, req.body);
  res.json({ message: 'User updated successfully' });
});

const destroy = catchRequest(async (req, res) => {
  await userService.deleteUser({ _id: req.params.id });
  res.json({ message: 'User deleted successfully' });
});

const read = catchRequest(async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  res.json(user);
});

module.exports = {
  list,
  create,
  update,
  destroy,
  read,
};
