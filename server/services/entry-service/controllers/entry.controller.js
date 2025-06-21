import { EntryModel } from '../models/entry.model.js';

export class EntryController {
  constructor() {
    this.entryModel = EntryModel;
  }

  getAllEntriesFromUser = async (req, res, next) => {
    try {
      const userId = req.headers['x-user-id'];
      const entries = await this.entryModel.getAllEntriesFromUser({ userId });
      res
        .status(200)
        .json({ message: 'Entries retrieved successfully', entries: entries });
    } catch (error) {
      next(error);
    }
  };

  getEntry = async (req, res, next) => {
    try {
      const { entryId } = req.params;
      const entry = await this.entryModel.getEntry({ entryId });
      if (!entry) {
        return res.status(404).json({ message: 'Entry not found' });
      }
      res
        .status(200)
        .json({ message: 'Entry retrieved successfully', entry: entry });
    } catch (error) {
      next(error);
    }
  };

  createEntry = async (req, res, next) => {
    try {
      const userId = req.headers['x-user-id'];
      const { content, title, starred } = req.body;
      const entry = await this.entryModel.createEntry({
        user_id: userId,
        content,
        title,
        starred,
      });
      res.status(201).json({
        message: 'Entry created successfully',
        entry: entry,
      });
    } catch (error) {
      next(error);
    }
  };

  updateEntry = async (req, res, next) => {
    try {
      const { entryId } = req.params;
      const { content, title, starred } = req.body;
      const entry = await this.entryModel.updateEntry({
        entryId,
        content,
        title,
        starred,
      });
      res
        .status(200)
        .json({ message: 'Entry updated successfully', entry: entry });
    } catch (error) {
      next(error);
    }
  };

  deleteEntry = async (req, res, next) => {
    try {
      const { entryId } = req.params;
      await this.entryModel.deleteEntry({ entryId });
      res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
