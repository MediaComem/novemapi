const { adminToken } = require('../config');

/**
 * Bare-bones authentication mechanism where a static bearer token is required
 * to access admin functionality.
 */
exports.authenticateAdmin = function(req, res, next) {

  // Do not allow admin operations without a configured token.
  if (!adminToken) {
    return res.sendStatus(401);
  }

  // Require the Authorization header to be sent.
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return res.sendStatus(401);
  }

  // Require the header to be properly formatted.
  const match = authorizationHeader.match(/^Bearer (.+)$/);
  if (!match) {
    return res.sendStatus(401);
  }

  // Check that the token is valid.
  const bearerToken = match[1];
  if (bearerToken !== adminToken) {
    return res.sendStatus(401);
  }

  next();
};