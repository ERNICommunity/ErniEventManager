import { default as GeneralController } from './general-controller';
import mockingoose from 'mockingoose';
import * as mongoose from 'mongoose';

const ModelMock = mongoose.model('ModelMock',  new mongoose.Schema({
    field1: {type: String},
    field2: {type: String},
    field3: {type: String}
}));

const docMock = {_id: '507f191e810c19729de860ea', field1: 'value'};

jest.mock('../utils', () => {
    return {
        allowedFields: {
            ModelMock: 'id field1 field2'
        }
    };
});

describe('General Controller', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        mockingoose.ModelMock.toReturn(docMock, 'findOne');
    });
    describe('constructor()', () => {
        it('should set name to class', () => {
            const controller = new GeneralController(ModelMock, 'ModelMock');
            expect(controller.name).toEqual('ModelMock');
        });

        it('should set model to class', () => {
            const controller = new GeneralController(ModelMock, 'ModelMock');
            expect(controller.model).toEqual(ModelMock);
        });
    });

    describe('create()', () => {
        it('should create new item based on given data', async () => {
            const createSpy = jest.spyOn(ModelMock, 'create');
            const findSpy = jest.spyOn(ModelMock, 'findById');
            const item = {data: {field1: 'something'}};
            const controller = new GeneralController(ModelMock, 'ModelMock');
            const result = await controller.create(item);

            expect(findSpy).toBeCalledWith(createSpy.mock.calls[0][0]._id, 'id field1 field2');
            expect(createSpy.mock.calls[0][0].field1).toEqual(item.data.field1);
            expect(JSON.parse(JSON.stringify(result))).toEqual(docMock);
        });

        it('should throw error if create response is falsy', async () => {
            ModelMock.create = jest.fn().mockReturnValue(false);
            const item = {data: {field1: 'something'}};
            const controller = new GeneralController(ModelMock, 'ModelMock');
            try {
                const result = await controller.create(item);
                throw new Error('Should throw error');
            } catch (err) {
                expect(err.message).toEqual('Problem with creating item in ModelMock');
            }
        });
    });
    describe('get()', () => {
        it('should return item based on id', async () => {
            const findSpy = jest.spyOn(ModelMock, 'findById');
            const controller = new GeneralController(ModelMock, 'ModelMock');
            const result = await controller.get({id: docMock._id});

            expect(findSpy).toBeCalledWith(docMock._id, 'id field1 field2');
            expect(JSON.parse(JSON.stringify(result))._id).toEqual(docMock._id);
        });

        it('should throw error if no event is found', async () => {
            ModelMock.findById = jest.fn().mockResolvedValue(undefined);
            const item = {data: {field1: 'something'}};
            const controller = new GeneralController(ModelMock, 'ModelMock');
            try {
                const result = await controller.get({id: docMock._id});
                throw new Error('Should throw error');
            } catch (err) {
                expect(err.message).toEqual('Unable to find event');
            }
        });
    });

    describe('getAll()', () => {
        it('should call method queryDataPaginated and return it\'s results', async () => {
            const controller = new GeneralController(ModelMock, 'ModelMock');
            controller.queryDataPaginated = jest.fn().mockReturnValue({field: 'value'});
            const result = await controller.getAll('parameters');
            expect(controller.queryDataPaginated).toBeCalledWith('parameters');
            expect(result).toEqual({field: 'value'});
        });
    });

    describe('update()', () => {
        it('should throw error if event is not found', async () => {
            ModelMock.findById = jest.fn().mockResolvedValue(false);
            const controller = new GeneralController(ModelMock, 'ModelMock');
            try {
                await controller.update({id: docMock._id, data: docMock});
                throw new Error('Should throw error');
            } catch (err) {
                expect(err.message).toEqual('Event not found');
            }
        });

        it('should throw error if findByIdAndUpdate is falsy', async () => {
            ModelMock.findById = jest.fn().mockResolvedValue(docMock);
            ModelMock.findByIdAndUpdate = jest.fn().mockResolvedValue(false);
            const controller = new GeneralController(ModelMock, 'ModelMock');
            try {
                await controller.update({id: docMock._id, data: docMock});
                throw new Error('Should throw error');
            } catch (err) {
                expect(err.message).toEqual('Problem with updating event');
            }
        });

        it('should call update function on model and return updated item', async () => {
            const update = {field2: 'newValue'};
            const docMockUpdated = Object.assign({}, docMock, update);
            ModelMock.findById = jest.fn()
                .mockResolvedValueOnce(docMock)
                .mockResolvedValueOnce(docMockUpdated);
            ModelMock.findByIdAndUpdate = jest.fn().mockResolvedValue(docMockUpdated);
            const updateSpy = jest.spyOn(ModelMock, 'findByIdAndUpdate');
            const controller = new GeneralController(ModelMock, 'ModelMock');
            const result = await controller.update({id: docMock._id, data: docMockUpdated});
            expect(result).toEqual(docMockUpdated);
            expect(updateSpy).toBeCalledWith(docMock._id, docMockUpdated, {upsert: true});
        });
    });

    describe('delete()', () => {
        it('should throw error if event is not found', async () => {
            ModelMock.findById = jest.fn().mockResolvedValue(false);
            const controller = new GeneralController(ModelMock, 'ModelMock');
            try {
                await controller.delete({id: docMock._id});
                throw new Error('Should throw error');
            } catch (err) {
                expect(err.message).toEqual('You are not allowed to delete this entry');
            }
        });

        it('should throw error if findByIdAndRemove is falsy', async () => {
            ModelMock.findById = jest.fn().mockResolvedValue(docMock);
            ModelMock.findByIdAndRemove = jest.fn().mockResolvedValue(false);
            const controller = new GeneralController(ModelMock, 'ModelMock');
            try {
                await controller.delete({id: docMock._id});
                throw new Error('Should throw error');
            } catch (err) {
                expect(err.message).toEqual('Problem with deleting event');
            }
        });

        it('should return query paginated data after item is deleted', async () => {
            const deleteParameters = {id: docMock._id};
            ModelMock.findById = jest.fn().mockResolvedValue(docMock);
            ModelMock.findByIdAndRemove = jest.fn().mockResolvedValue(docMock);
            const controller = new GeneralController(ModelMock, 'ModelMock');
            controller.queryDataPaginated = jest.fn().mockImplementation(() => docMock);
            const result = await controller.delete(deleteParameters);
            expect(result).toEqual(docMock);
            expect(controller.queryDataPaginated).toBeCalledWith(deleteParameters);
        });
    });

    describe('queryDataPaginated()', () => {
        it('should throw error if more than 11 parameters are sent to it', async () => {
            try {
                const controller = new GeneralController(ModelMock, 'ModelMock');
                const result = await controller.queryDataPaginated({
                    param1: 'value',
                    param2: 'value',
                    param3: 'value',
                    param4: 'value',
                    param5: 'value',
                    param6: 'value',
                    param7: 'value',
                    param8: 'value',
                    param9: 'value',
                    param10: 'value',
                    param11: 'value',
                    param12: 'value',
                });
                throw new Error('Should throw error!');
            } catch (err) {
                expect(err.message).toEqual('Too many properties');
            }
        });

        it('should send filter options to mongo query', async () => {
            const findReturn = {
                skip: function () { return this; },
                limit: function () { return this; },
                sort: function () { return this; },
                exec: function () { return [docMock]; },
            };

            const filterQuery = {
                size: 2,
                index: 3,
                sort: {way: 'way', field: 'field'},
                someField1: 'value',
                someField2: 9,
                qi: 'someQi'
            };

            ModelMock.find = jest.fn().mockReturnValue(findReturn);
            ModelMock.count = jest.fn().mockReturnValue(1);

            const skipSpy = jest.spyOn(findReturn, 'skip');
            const limitSpy = jest.spyOn(findReturn, 'limit');
            const sortSpy = jest.spyOn(findReturn, 'sort');
            const execSpy = jest.spyOn(findReturn, 'exec');

            const controller = new GeneralController(ModelMock, 'ModelMock');
            const result = await controller.queryDataPaginated(filterQuery);

            expect(skipSpy).toBeCalledWith(6);
            expect(limitSpy).toBeCalledWith(2);
            expect(sortSpy).toBeCalledWith(filterQuery.sort.way + filterQuery.sort.field);
            expect(execSpy).toBeCalled();
            expect(ModelMock.count).toBeCalledWith({someField1: '/.*value*/i', someField2: 9});

            expect(result.list).toEqual([docMock]);
            expect(result.length).toEqual(1);
            expect(result.qi).toEqual('someQi');
        });

        it('should set default parameters of size, index and sort', async () => {
            const findReturn = {
                skip: function () { return this; },
                limit: function () { return this; },
                sort: function () { return this; },
                exec: function () { return [docMock]; },
            };

            ModelMock.find = jest.fn().mockReturnValue(findReturn);

            const skipSpy = jest.spyOn(findReturn, 'skip');
            const limitSpy = jest.spyOn(findReturn, 'limit');
            const sortSpy = jest.spyOn(findReturn, 'sort');

            const controller = new GeneralController(ModelMock, 'ModelMock');
            const result = await controller.queryDataPaginated({});

            expect(skipSpy).toBeCalledWith(0);
            expect(limitSpy).toBeCalledWith(10);
            expect(sortSpy).toBeCalledWith('date');
        });

        it('should throw error if mongo returns error', async () => {
            ModelMock.find = jest.fn().mockImplementation(() => {
                throw new Error('Some error!');
            });

            try {
                const controller = new GeneralController(ModelMock, 'ModelMock');
                await controller.queryDataPaginated({});
            } catch (err) {
                expect(err.message).toEqual('Some error!');
            }
        });
    });
});
