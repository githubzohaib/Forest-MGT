import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Assuming 'user' model also needs a .js extension

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    // Replace YOUR_JWT_SECRET with your actual secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
    // Find the user by ID
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user; // Attach the user object to the request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export default authMiddleware; // ✅ Changed from module.exports