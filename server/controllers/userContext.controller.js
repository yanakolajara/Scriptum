import { userContextStructure } from '../services/data/userContextStructure.js';
import { genaiRequest } from '../services/genai.service.js';
import { UnauthorizedError, ValidationError } from '../utils/errors.js';

export class UserContextController {
  constructor({ userContextModel }) {
    this.userContextModel = userContextModel;
  }

  getUserContext = async (req, res, next) => {
    try {
      // const user = req.session.user;
      // if (!user) throw new UnauthorizedError('User not logged in.');
      // const { id } = req.params;
      // if (!id) throw new ValidationError('No id provided.');
      // const entry = await this.entryModel.getEntry(id);
      // if (!entry) throw new ValidationError('Entry not found.');
      // res
      //   .status(200)
      //   .json({ message: 'Entry retrieved successfully', data: entry });
    } catch (error) {
      next(error);
    }
  };

  createUserContext = async (req, res, next) => {
    // try {
    //   const user = req.session.user;
    //   if (!user) throw new UnauthorizedError('User not logged in.');
    //   const data = req.body;
    //   if (!data) throw new ValidationError('No data provided.');
    //   const prompt =
    //     'Generate an entry in first person based on the chat history. ' +
    //     'The entry should be a summary of the conversation, ' +
    //     'including the main topics discussed and any important details. ' +
    //     'Please make sure to use proper grammar and punctuation. ';
    //   const entry = await genaiRequest(
    //     `${prompt} \n\n ${JSON.stringify(data)}`
    //   );
    //   const newEntry = await this.entryModel.createEntry({
    //     content: entry.response.text(),
    //     user_id: user.id,
    //   });
    //   res.status(201).json({
    //     message: 'Entry created successfully',
    //     data: newEntry,
    //   });
    // } catch (error) {
    //   next(error);
    // }
  };

  updateUserContext = async (req, res, next) => {
    try {
      const user = req.session.user;
      console.log(user);
      if (!user) throw new UnauthorizedError('User not logged in.');
      const data = req.body;
      if (!data) throw new ValidationError('No data provided.');
      // Updates the user context by adding relevant information to the existing context, if any. (responds only with the updated context as a JSON object). USE THE USER CONTEXT STRUCTURE AS A TEMPLATE
      const prompt =
        'Update the user context based on the provided data, if any. Respond only with the updated context as a JSON object, without any additional text. Use the user context structure as a template. Do not delete any past context unless explicitly changed by the user. Do not add, remove, or rename keys. Modify values within the given structure. If no new details exist, return the JSON unchanged. Now, I will first provide you with the user context and then the data that I want to update the context with. Please respond only with the updated context as a JSON object.';

      const userContext = await this.userContextModel.getUserContext(user.id);
      const context = await genaiRequest(
        `${prompt} \n\n ${JSON.stringify(userContext)} \n\n ${JSON.stringify(
          data
        )}`
      );

      const updatedContext = await this.userContextModel.updateUserContext(
        user.id,
        context.response.text()
      );
      res.status(200).json({
        message: 'User context updated successfully',
        data: updatedContext,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUserContext = async (req, res, next) => {
    // try {
    //   const user = req.session.user;
    //   if (!user) throw new UnauthorizedError('User not logged in.');
    //   const { id } = req.params;
    //   if (!id) throw new ValidationError('No id provided.');
    //   const entry = await this.entryModel.deleteEntry(id);
    //   res
    //     .status(200)
    //     .json({ message: 'Entry deleted successfully', data: entry });
    // } catch (error) {
    //   next(error);
    // }
  };
}
