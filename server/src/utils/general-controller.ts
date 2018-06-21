import { allowedFields } from '../utils';
import { Model } from 'mongoose';

class GeneralController {
    public model: Model<any>;
    public name: string;

    constructor(model: Model<any>, name: string) {
        this.model = model;
        this.name = name;
    }

    async create(params: any) {
        const newEvent = new this.model(params.data);
        if (await this.model.create(newEvent)) {
            console.log(allowedFields[this.name]);
            const event = await this.model.findById(newEvent._id, allowedFields[this.name]);
            return event;
        }
        throw new Error('Problem with creating event');

    }

    async get(params: any) {
        const event = await this.model.findById(params.id, allowedFields[this.name]);
        if (event) {
            return event;
        }
        throw new Error('Unable to find event');
    }

    async getAll(params: any) {
        const eventResponse = await this.queryDataPaginated(params);
        return eventResponse;
    }

    async update(params: any) {
        const { id } = params;
        const { data } = params;
        delete data._id;
        if (await this.model.findById(id)) {
            if (await this.model.findByIdAndUpdate(id, data, { upsert: true })) {
                const event = await this.model.findById(id, allowedFields[this.name]);
                return event;
            }
            throw new Error('Problem with updating event');
        }
        throw new Error('Event not found');
    }

    async delete(params: any) {
        const { id } = params;
        const paginated = params;
        if (await this.model.findById(id)) {
            if (await this.model.findByIdAndRemove(id)) {
                const eventResponse = await this.queryDataPaginated(params);
                return eventResponse;
            }
            throw new Error('Problem with deleting event');
        }
        throw new Error ('You are not allowed to delete this entry');
    }

    async queryDataPaginated(filterInfo: any, reqUser?: string, isAdmin?: boolean) {
        try {
            let { filter, size, index, sort} = filterInfo;
            delete filterInfo.size;
            delete filterInfo.index;
            size = (typeof size === 'number' && size > 0) ? size : 10;
            index = (typeof index === 'number') ? index : 0;
            sort = (typeof sort !== 'undefined') ? sort : <any>{ way: '', field: 'date' };
            filter = {};
            for (const key of Object.keys(filterInfo)) {
                switch (key) {
                    case 'qi':
                        break;
                    case 'way':
                    case 'field':
                        sort[key] = filterInfo[key];
                        break;
                    default:
                        filter[key] = filterInfo[key];
                }
            }
            const mongoFilter: any = {};
            let counter = 10;
            for (const property of Object.keys(filter)) {
                const propValue = filter[property];
                if (counter-- < 0) {
                    throw new Error('Too many properties');
                } else if (propValue === undefined) {
                    continue;
                } else if (typeof (propValue) === 'number') {
                    mongoFilter[property] = propValue;
                } else if (typeof (propValue) === 'string') {
                    mongoFilter[property] = `/.*${propValue}*/i`;
                }
            }
            const list = await this.model.find(mongoFilter, allowedFields[this.name])
                .skip(size * index)
                .limit(size)
                .sort(sort.way + sort.field)
                .exec();
            const length = await this.model.count(mongoFilter);
            return {
                list,
                length,
                qi: filterInfo.qi
            };
        } catch (err) {
            throw err;
        }
    }

}

export default GeneralController;
