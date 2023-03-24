const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the authorization header
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    // If no token provided, return a 401 error
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    // Attach the user ID from the token to the request object for use in subsequent middleware
    req.userId = decodedToken.userId;
    console.log(decodedToken)
    next();
  } catch (err) {
    // If the token is invalid, return a 401 error
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authMiddleware;
