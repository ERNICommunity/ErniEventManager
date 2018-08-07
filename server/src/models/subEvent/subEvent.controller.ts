import { default as SubEventModel } from './subEvent.model';
import { Model } from 'mongoose';
import { default as GeneralController } from '../../utils/general-controller';

class SubEventController extends GeneralController {
    constructor(model: Model<any>, name: string) {
        super(model, name);
    }
}

module.exports = new SubEventController(SubEventModel, 'SubEvent');