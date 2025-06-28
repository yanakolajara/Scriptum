export class ContextController {
  constructor({ ContextModel, GeminiService }) {
    this.contextModel = ContextModel;
    this.geminiServie = new GeminiService();
  }

  getContext = async (req, res, next) => {
    const userId = req.headers['x-user-id'];

    try {
      const context = await this.contextModel.getContext({ userId });
      if (!context) {
        res.status(404).json({ message: 'Context not found' });
      } else {
        res.status(200).json({
          message: 'Context retrieved successfully',
          data: context,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  createContext = async (req, res, next) => {
    const chat = req.body.chat;
    const userId = req.headers['x-user-id'];

    try {
      const existingContext = await this.contextModel.getContext({ userId });
      if (existingContext) {
        return res.status(400).json({
          message: 'Context already exists',
        });
      }

      const context = await this.geminiServie.generateContext({ chat });
      const data = await this.contextModel.createContext({
        context,
        userId,
      });

      res.status(201).json({
        message: 'Context created successfully',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateContext = async (req, res, next) => {
    const chat = req.body.chat;
    const userId = req.headers['x-user-id'];

    try {
      const context = await this.contextModel.getContext({ userId });
      if (!context) {
        return res.status(404).json({ message: 'Context not found' });
      }
      const newContext = await this.geminiServie.updateContext({
        chat,
        context,
      });

      const data = await this.contextModel.updateContext({
        userId,
        context: newContext,
      });
      res.status(200).json({
        message: 'Context updated successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteContext = async (req, res, next) => {
    try {
      const userId = req.headers['x-user-id'];
      const context = await this.contextModel.deleteContext({ userId });
      if (!context) {
        res.status(404).json({ message: 'Context not found' });
      } else {
        res.status(200).json({
          message: 'Context deleted successfully',
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
