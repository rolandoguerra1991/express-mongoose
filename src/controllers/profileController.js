const catchRequest = require('../utils/catchRequest');
const { userService, authService } = require('../services');

const updatePassword = catchRequest(async (req, resp) => {
  const { id } = req.user;
  const { newPassword, currentPassword } = req.body;
  const user = await userService.findUserById(id);
  await authService.validateUserPassword(currentPassword, user);
  await userService.changePassword({ _id: id }, newPassword);

  resp.json({ message: 'Password updated successfully' });
});

const updateProfileImage = catchRequest(async (req, resp) => {
  const { id } = req.user;
  const profileImage = req.file;
  await userService.updateUser({ _id: id }, { profileImage: profileImage.originalname });

  resp.json({ message: 'Profile image updated successfully' });
});

const updateProfile = catchRequest(async (req, resp) => {
  const { name, email } = req.body;
  const { id } = req.user;
  await userService.updateUser({ _id: id }, { name, email });

  resp.json({ message: 'Profile updated successfully' });
});

module.exports = {
  updatePassword,
  updateProfileImage,
  updateProfile,
};
