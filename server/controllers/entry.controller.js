import { UnauthorizedError } from '../utils/errors.js';

export class EntryController {
  constructor({ entryModel }) {
    this.entryModel = entryModel;
  }

  getAllEntries = async (req, res, next) => {
    console.log('in entry controller');
    console.log(req.session);
    try {
      const user = req.session.user;
      if (!user) throw new UnauthorizedError('User not logged in.');
      const entries = await this.entryModel.getAllEntries(user.id);
      res
        .status(200)
        .json({ message: 'Entries retrieved successfully', data: entries });
    } catch (error) {
      next(error);
    }
  };
}
