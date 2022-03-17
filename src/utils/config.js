const config = require('../config')

module.exports = {
  get: (key = '') => {
    const keys = key.split('.')
    let result = config
    for (let i = 0; i < keys.length; i++) {
      result = result[keys[i]]
    }
    return result
  }
}
