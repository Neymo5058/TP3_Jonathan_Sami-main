import crypto from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';
import AppError from '../utils/appError.js';
// TODO CHANGE THE NAME OF THE MESSAGE

export const authController = {
  signToken: (id) => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
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
      const role = (req.body.role = req.body.role?.charAt(0).toUpperCase() + req.body.role?.slice(1).toLowerCase());
      const newUser = await User.create({ username, password, role });
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

      const user = await User.findOne({ username }).select('+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Nom d’utilisateur ou mot de passe incorrect.', 401));
      }

      console.log(authController.createSendToken(user, 200, res));
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

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(new AppError('User does not exsist.', 404));
      }

      req.user = currentUser;
      next();
    } catch (err) {
      next(err);
    }
  },
  restrictTo: (...roles) => {
    return (req, res, next) => {
      try {
        if (!roles.includes(req.user.role)) {
          return next(new AppError("Vous n'avez pas la permission d'accéder à cette ressource", 403));
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  },
};

export default authController;
