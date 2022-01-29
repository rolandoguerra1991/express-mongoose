const catchValidations = require('../utils/catchValidations');
const userService = require('../services/user.service');

const list = async (request, response) => {
  try {
    const users = await userService.query(request.query);
    response.json(users);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const create = catchValidations(async (request, response) => {
  try {
    const user = await userService.createUser(request.body);
    response.json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

const update = catchValidations(async (request, response) => {
  try {
    await userService.updateUser({ _id: request.params.id }, request.body);
    response.json({ message: 'User updated successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

const destroy = async (request, response) => {
  try {
    await userService.deleteUser({ _id: request.params.id });
    response.json({ message: 'User deleted successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
const read = async (request, response) => {
  try {
    const user = await userService.findUserById(request.params.id);
    response.json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  list,
  create,
  update,
  destroy,
  read,
};
