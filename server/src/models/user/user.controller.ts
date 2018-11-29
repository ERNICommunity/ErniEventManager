import { default as UserModel } from './user.model';
import { Model } from 'mongoose';
import { default as GeneralController } from '../../utils/general-controller';

class UserController extends GeneralController {
    constructor(model: Model<any>, name: string) {
        super(model, name);
    }

    async getByEmail(email: string) {
      const item = await this.model.find({email: email});
      if (item && item.length) {
        return item[0];
      }
      throw new Error('Unable to find user');
    }

    async createUser(user: any) {
      const newUser = new this.model(user);
      await newUser.save();
    }
}

module.exports = new UserController(UserModel, 'User');
