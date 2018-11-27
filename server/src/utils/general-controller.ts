import { allowedFields } from '../utils';
import { Model } from 'mongoose';

class GeneralController {
    public model: Model<any>;
    public name: string;
    public populate: Array<string>;

    constructor(model: Model<any>, name: string) {
        this.model = model;
        this.name = name;
        this.populate = [];
    }

    /**
     * Creates new item in model
     * @param params {object}
     * @param params.data {object} data to store
     * @returns {Promise<object>} created item
     */
    async create(params: {data: any}) {
        const newItem = new this.model(params.data);
        if (await this.model.create(newItem)) {
            const item = await this.model.findById(newItem._id, allowedFields[this.name]);
            return item;
        }
        throw new Error(`Problem with creating item in ${this.name}`);

    }

    /**
     * Returns item from model based on id
     * @param params {object}
     * @param params.id {string} id of item to find
     * @returns {Promise<Object>}
     */
    async get(params: any) {
      const item = await this.model.findOne({_id: params.id}, allowedFields[this.name])
        .populate('participants')
        .populate('editors')
        .exec();
      if (item) {
        return item;
      }
      throw new Error('Unable to find event');
    }

    /**
     * Returns all items that match filter
     * @param params {object}
     * @returns {Promise<array>}
     */
    async getAll(params: any) {
        delete params.user;
        const response = await this.queryDataPaginated(params);
        return response;
    }

    /**
     * Updates item in model
     * @param params {object}
     * @param params.id {string} id of item to update
     * @param params.data {object} data to update
     * @returns {Promise<object>}
     */
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

    /**
     * Deletes item from model
     * @param params {object}
     * @param params.id {string} id of item to remove
     * @returns {Promise<array>}
     */
    async delete(params: any) {
        const { id } = params;
        const paginated = params;
        if (await this.model.findById(id)) {
            if (await this.model.findByIdAndRemove(id)) {
                const response = await this.queryDataPaginated(params);
                return response;
            }
            throw new Error('Problem with deleting event');
        }
        throw new Error ('You are not allowed to delete this entry');
    }

    /**
     * Returns items based on filter data
     * @param filterInfo {object} object with filter data
     * @param filterInfo.size {number} size of one page
     * @param filterInfo.index {number} which page to get
     * @param filterInfo.sort {object} sorting specification
     * @param filterInfo.* {any} any other parameter for find function
     * @returns {Promise<{list: any[]; length: number; qi: (any | string | string)}>}
     */
    async queryDataPaginated(filterInfo: any) {
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
                } else if (Array.isArray(propValue) && propValue.every(this._isStringOrNumber)) {
                    mongoFilter[property] = {$in: propValue};
                }
            }

            const list = await this.model.find(mongoFilter, allowedFields[this.name])
                .populate('participants')
                .populate('editors')
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

    _isStringOrNumber(item: any) {
      return typeof item === 'string' || typeof item === 'number';
    }

}

export default GeneralController;
