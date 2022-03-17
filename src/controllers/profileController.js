const catchRequest = require('../utils/catchRequest')
const { userService, authService } = require('../services')
const { getFileUrl } = require('../utils/uploadFile')

const updatePassword = catchRequest(async (req, res) => {
  const { id } = req.user
  const { newPassword, currentPassword } = req.body
  const user = await userService.findUserById(id)
  await authService.validateUserPassword(currentPassword, user)
  await userService.changePassword({ _id: id }, newPassword)

  res.json({ message: 'Password updated successfully' })
})

const updateProfileImage = catchRequest(async (req, res) => {
  const { id } = req.user
  const profileImage = req.file
  const imageUrl = await getFileUrl('profile-images', profileImage.filename)
  await userService.updateUser({ _id: id }, { profileImage: imageUrl })

  res.json({ message: 'Profile image updated successfully' })
})

const updateProfile = catchRequest(async (req, res) => {
  const { name, email } = req.body
  const { id } = req.user
  await userService.updateUser({ _id: id }, { name, email })

  res.json({ message: 'Profile updated successfully' })
})

module.exports = {
  updatePassword,
  updateProfileImage,
  updateProfile
}
