const { authorization } = require('../config');

const checkAbilities = (ability) => async (req, res, next) => {
  const rules = authorization;
  const userAbilities = rules.find(rule => rule.role === req.user.role).abilities;
  const haveAbility = userAbilities.includes(ability);

  if (!haveAbility && !userAbilities.includes('*')) {
    return res.status(403).json({
      error: 'You are not authorized to perform this action',
    });
  }
  next();
};

module.exports = checkAbilities;
