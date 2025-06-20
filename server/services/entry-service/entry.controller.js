import { genaiRequest } from '../services/genai.service.js';
import { UnauthorizedError, ValidationError } from '../../utils/errors.js';

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

  getEntry = async (req, res, next) => {
    try {
      const user = req.session.user;
      if (!user) throw new UnauthorizedError('User not logged in.');
      const { id } = req.params;
      if (!id) throw new ValidationError('No id provided.');
      const entry = await this.entryModel.getEntry(id);
      if (!entry) throw new ValidationError('Entry not found.');
      res
        .status(200)
        .json({ message: 'Entry retrieved successfully', data: entry });
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
      const prompt =
        'Generate an entry in first person based on the chat history. ' +
        'The entry should be a summary of the conversation, ' +
        'including the main topics discussed and any important details. ' +
        'Please make sure to use proper grammar and punctuation. ';
      const entry = await genaiRequest(
        `${prompt} \n\n ${JSON.stringify(data)}`
      );

      const newEntry = await this.entryModel.createEntry({
        content: entry.response.text(),
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

  updateEntry = async (req, res, next) => {
    try {
      const user = req.session.user;
      if (!user) throw new UnauthorizedError('User not logged in.');
      const { id } = req.params;
      if (!id) throw new ValidationError('No id provided.');
      const data = req.body;
      if (!data) throw new ValidationError('No data provided.');
      const entry = await this.entryModel.updateEntry(id, data);
      res
        .status(200)
        .json({ message: 'Entry updated successfully', data: entry });
    } catch (error) {
      next(error);
    }
  };

  deleteEntry = async (req, res, next) => {
    try {
      const user = req.session.user;
      if (!user) throw new UnauthorizedError('User not logged in.');
      const { id } = req.params;
      if (!id) throw new ValidationError('No id provided.');
      const entry = await this.entryModel.deleteEntry(id);
      res
        .status(200)
        .json({ message: 'Entry deleted successfully', data: entry });
    } catch (error) {
      next(error);
    }
  };
}
