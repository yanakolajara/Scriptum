import { UnauthorizedError, ValidationError } from '../utils/errors.js';

export class EntryController {
  constructor({ entryModel }) {
    this.entryModel = entryModel;
  }

  getAllEntries = async (req, res, next) => {
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

  createEntry = async (req, res, next) => {
    try {
      const user = req.session.user;
      if (!user) throw new UnauthorizedError('User not logged in.');
      const data = req.body;
      if (!data) throw new ValidationError('No data provided.');
      //todo: validate if data contains the required information
      const newEntry = await this.entryModel.createEntry({
        ...data,
        user_id: user.id,
      });
      res.status(201).json({
        message: 'Entry created successfully',
        data: newEntry,
      });
    } catch (error) {
      next(error);
    }
  };
}
