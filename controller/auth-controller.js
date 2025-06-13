
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import UserModel from '../model/UserModel.js';
import AppError from '../middleware/appError.js';

export const authController = {
  signToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },

  createSendToken: (user, statusCode, res) => {
    const token = authController.signToken(user._id);

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  },

  signup: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const role = req.body.role?.toLowerCase();
      const formattedRole = role === 'admin' ? 'admin' : 'mage';

      const newUser = await UserModel.create({ username, password, role: formattedRole });

      authController.createSendToken(newUser, 201, res);
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return next(new AppError('Merci de fournir un nom d’utilisateur et un mot de passe.', 400));
      }

      const user = await UserModel.findOne({ username }).select('+password');

      if (!user || user.password !== password) {
        return next(new AppError('Nom d’utilisateur ou mot de passe incorrect.', 401));
      }

      authController.createSendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  },

  protect: async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return next(new AppError('You should be connected to login.', 401));
      }

      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      const currentUser = await UserModel.findById(decoded.id);
      if (!currentUser) {
        return next(new AppError('User does not exist.', 404));
      }

      req.user = currentUser;
      next();
    } catch (err) {
      next(err);
    }
  },

  authorizeAdminOrOwner(getOwnerId) {
    return async (req, res, next) => {
      if (req.user.role === 'admin') return next();
      const ownerId = await getOwnerId(req);
      if (String(req.user.id) === String(ownerId)) return next();
      return res.status(403).json({ message: 'Forbidden' });
    };
  },
};

export default authController;
