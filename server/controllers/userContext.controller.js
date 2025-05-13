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
      console.log('updateUserContext');
      const user = req.session.user;
      if (!user) throw new UnauthorizedError('User not logged in.');
      const data = req.body;
      if (!data) throw new ValidationError('No data provided.');
      // Updates the user context by adding relevant information to the existing context, if any. (responds only with the updated context as a JSON object). USE THE USER CONTEXT STRUCTURE AS A TEMPLATE
      const prompt =
        'Update the user context based on the provided data, if any. Respond only with the updated context as a JSON object, without any additional text. Use the user context structure as a template. ';
      const context = await genaiRequest(
        `${prompt} \n\n ${JSON.stringify(
          userContextStructure
        )} \n\n ${JSON.stringify(data)}`
      );
      console.log('user.id', user.id);
      console.log('context.response.text()', context.response.text());

      const updatedContext = await this.userContextModel.updateEntry(
        user.id,
        context.response.text()
      );
      res.status(200).json({
        message: 'User context updated successfully',
        data: updatedContext,
      });
    } catch (error) {
      console.log(error);
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
