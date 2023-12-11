const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded
    next()
  } catch (ex) {
    res.status(401).send('Admin Authentication Needed')
  }
}
