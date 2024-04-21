const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const accessToken = req.cookies.token;

  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.authenticatedUser = user;
    next();
  } catch (error) {
    res.clearCookie('token');
    res.status(401).send('Etwas ist schief gelaufen mit verifyToken');
  }
}

module.exports = {
  verifyToken,
};
