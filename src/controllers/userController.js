const { userService } = require('../services')
const { validationResult } = require('express-validator')

const list = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const users = await userService.query(req.query)
  res.json(users)
}

const create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const user = await userService.createUser(req.body)
  res.json(user)
}

const update = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  await userService.updateUser({ _id: req.params.id }, req.body)
  res.json({ message: 'User updated successfully' })
}

const destroy = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const { id } = req.user
  await userService.deleteUser({ _id: req.params.id, authUserId: id })
  res.json({ message: 'User deleted successfully' })
}

const read = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const user = await userService.findUserById(req.params.id)
  res.json(user)
}

module.exports = {
  list,
  create,
  update,
  destroy,
  read
}
