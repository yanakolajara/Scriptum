import { validatePartialUser, validateUser } from '../schemas/user.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

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
    // const result = validateUser(req.body);
    const result = req.body;
    // if (!result.success) {
    //   return res.status(400).json({ message: result.error.message });
    // }
    console.log(result);
    const user = await this.userModel.create(result);
    res.status(201).json({
      success: true,
      // message: 'Please check your email for the verification code.',
      data: {
        result,
      },
    });
  };

  // get = async (req, res) => {
  //   const result = validatePartialUser(req.body);
  //   if (!result.success) {
  //     return res.status(400).json({ message: result.error.message });
  //   }
  //   const user = this.userModel.login(result);
  //   const token = jwt.sign(
  //     {
  //       id: user.id,
  //     },
  //     process.env.JWT_SECRET
  //   );

  //   //TODO: Add an expiration timer to the token

  //   //TODO: Add cookie config to the cookie
  //   res
  //     .cookie('access_token', token, {
  //       httpOnly: true,
  //     })
  //     .status(200)
  //     .json({ success: true });
  // };

  update = async (req, res) => {
    // const result = validatePartialUser(req.body);
    // if (!result.success) {
    //   return res.status(400).json({ message: result.error.message });
    // }
    const result = {
      id: req.params.id,
      ...req.body,
    };
    const user = await this.userModel.update(result);
    res.status(200).json(user);
  };

  delete = async (req, res) => {
    const user = await this.userModel.delete({ id: req.params.id });
    res.status(200).json(user);
  };
}
