import jwt from 'jsonwebtoken';
import UserModel from '../model/UserModel.js';

const SECRET_KEY = 'arcane_secret_key';

const UserController = {
  async register(req, res) {
    const { username, password, role } = req.body;
    const existing = await UserModel.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    await UserModel.create({ username, password, role });
    res.status(201).json({ message: 'User registered successfully' });
  },

  async login(req, res) {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user || user.password !== password)
      return res.status(401).json({ message: req.__('messages.invalidCredentials') });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '2h' });
    res.status(200).json({ token });
  },
};

export default UserController;
