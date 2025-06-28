export class ContextController {
  constructor({ ContextModel, GeminiService }) {
    this.contextModel = ContextModel;
    this.geminiServie = new GeminiService();
  }

  getContextById = async (req, res, next) => {
    const id = req.params.id;

    try {
      const context = await this.contextModel.getContextById({ id });
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

  getContextByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    console.log(
      '🚀 ~ ContextController ~ getContextByUserId= ~ userId:',
      userId
    );
    try {
      const context = await this.contextModel.getContextByUserId({ userId });
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
    try {
      const chatHistory = req.body.chatHistory;
      console.log(
        '🚀 ~ ContextController ~ createContext= ~ chatHistory:',
        chatHistory
      );
      const userId = req.headers['x-user-id'];
      console.log('🚀 ~ ContextController ~ createContext= ~ userId:', userId);

      const context = await this.geminiServie.generateContext({ chatHistory });
      console.log(
        '🚀 ~ ContextController ~ createContext= ~ context:',
        context
      );
      const data = await this.contextModel.createContext({
        context,
        userId,
      });
      console.log('🚀 ~ ContextController ~ createContext= ~ data:', data);

      res.status(201).json({
        message: 'Context created successfully',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateContext = async (req, res, next) => {
    try {
      const chatHistory = req.body.chatHistory;
      const userId = req.headers['x-user-id'];

      const currentContext = await this.contextModel.getContext(userId);
      const updatedContext = await this.geminiServie.updateContext({
        chatHistory,
        currentContext,
      });

      const data = await this.contextModel.updateContext(
        userId,
        newContext.response.text()
      );
      res.status(200).json({
        message: 'User context updated successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteContext = async (req, res, next) => {
    try {
      const userId = req.headers['x-user-id'];

      await this.contextModel.deleteContext(userId);
      res.status(200).json({
        message: 'User context deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
