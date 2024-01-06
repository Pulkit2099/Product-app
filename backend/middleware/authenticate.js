// Step 4: Implement authentication middleware (middleware/authenticate.js)

const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your-secret-key');
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
 
const authenticate= async function isAuthenticated(req, res, next) {
    // Get the token from the request header
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Token missing or invalid' });
    }
  
    const token = authorizationHeader.slice(7);
  
    // Verify the token
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
  
      // If the token is valid, you can access the decoded data
      req.user = decoded;
      req.userId=decoded;
  
      // Proceed to the next middleware or route handler
      next();
    });
  }






module.exports = authenticate;