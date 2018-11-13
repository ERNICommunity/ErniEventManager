import { default as UserModel } from './user.model';
import { Model } from 'mongoose';
import { default as GeneralController } from '../../utils/general-controller';

class UserController extends GeneralController {
    constructor(model: Model<any>, name: string) {
        super(model, name);
    }

    async getByEmail(email: string) {
      const item = await this.model.find({email: email});
      if (item) {
        return item;
      }
      throw new Error('Unable to find user');
    }
}

module.exports = new UserController(UserModel, 'User');
