import { default as UserModel } from './user.model';
import { Model } from 'mongoose';
import { default as GeneralController } from '../../utils/general-controller';

class UserController extends GeneralController {
    constructor(model: Model<any>, name: string) {
        super(model, name);
    }
}

module.exports = new UserController(UserModel, 'User');
