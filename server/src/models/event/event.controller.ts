import { default as EventModel } from './event.model';
import { IEventSchema } from '../../interfaces';
import { Model } from 'mongoose';
import { default as GeneralController } from '../../utils/general-controller';

class EventController extends GeneralController {
    constructor(model: Model<any>, name: string) {
        super(model, name);
    }

    async create(params: {user: any, data: any}) {
      params.data.owner = params.user.id;

      return GeneralController.prototype.create.call(this, params);
    }

    async update(params: {user: any, data: any}) {
      const event = await this.get({id: params.data._id});
      if (event.owner && event.owner._id.toString() === params.user.id) {
        return GeneralController.prototype.update.call(this, params);
      }
      throw new Error('User is not permitted to edit this event');
    }

    async delete(params: {user: any, id: string}) {
      const event = await this.get({id: params.id});
      if (event.owner && event.owner._id.toString() === params.user.id) {
        return GeneralController.prototype.delete.call(this, params);
      }
      throw new Error('User is not permitted to edit this event');
    }

    async join(params: {user: any, id: string}) {
      const event = await this.model.findById(params.id).exec();
      if (event.participants.indexOf(params.user.id) === -1) {
        event.participants.push(params.user.id);
      }
      await event.save();
      return this.get(params);
    }

    async leave(params: {user: any, id: string}) {
      const event = await this.model.findById(params.id).exec();
      if (event.participants.indexOf(params.user.id) !== -1) {
        event.participants.splice(event.participants.indexOf(params.user.id), 1);
      }
      await event.save();
      return this.get(params);
    }

    async getJoined(params: any) {
      params.participants = [params.user.id];
      delete params.user;
      const response = await this.queryDataPaginated(params);
      return response;
    }
}

module.exports = new EventController(EventModel, 'Event');
