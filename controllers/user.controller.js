const catchRequest = require('../utils/catchRequest');
const { userService } = require('../services');

const list = catchRequest(async (request, response) => {
  const users = await userService.query(request.query);
  response.json(users);
});

const create = catchRequest(async (request, response) => {
  const user = await userService.createUser(request.body);
  response.json(user);
});

const update = catchRequest(async (request, response) => {
  await userService.updateUser({ _id: request.params.id }, request.body);
  response.json({ message: 'User updated successfully' });
});

const destroy = catchRequest(async (request, response) => {
  await userService.deleteUser({ _id: request.params.id });
  response.json({ message: 'User deleted successfully' });
});

const read = catchRequest(async (request, response) => {
  const user = await userService.findUserById(request.params.id);
  response.json(user);
});

module.exports = {
  list,
  create,
  update,
  destroy,
  read,
};
