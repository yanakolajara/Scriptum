import { validateUser } from '../schemas/user.js';

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    const users = await this.userModel.getAll();
    res.status(200).json(users);
  };

  getById = async (req, res) => {
    const user = this.userModel.getById(req.params.id);
    res.status(200).json(user);
  };
  create = async (req, res) => {
    const result = validateUser(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }
    const user = await this.userModel.create(result);
    res.status(201).json({
      success: true,
      message: 'Please check your email for the verification code.',
    });
  };
  verify = async (req, res) => {
    const user = await this.userModel.verify(req.body);
    //TODO: Create token
    //TODO: Send token as a cookie
    res.status(200).json(user);
  };

  login = async (req, res) => {
    res.status(200).json({ success: true });
  };
  update = async (req, res) => {
    res.status(200).json({ success: true });
  };
  delete = async (req, res) => {
    res.status(200).json({ success: true });
  };
}
