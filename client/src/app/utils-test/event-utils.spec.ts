import { IEventSchema, IEventResponse } from '../interfaces';
import { qiMock } from './index.spec';
import { of } from 'rxjs';

export const eventSchemaMock: IEventSchema = {
    _id: '111111111',
    name: 'Name',
    type: 'Type',
    state: 'State',
    startDate: new Date(),
    endDate: new Date(),
    location: {},
    owner: 'Owner',
    editors: [],
    participants: []
};

export const eventSchemaMock2: IEventSchema = {
    _id: '22222222',
    name: 'Name2',
    type: 'Type2',
    state: 'State2',
    startDate: new Date(),
    endDate: new Date(),
    location: {},
    owner: 'Owner2',
    editors: [],
    participants: []
};

export const eventResponseMock: IEventResponse = {
    list: [eventSchemaMock],
    length: 1,
    qi: qiMock
};

export const eventResponseMock2: IEventResponse = {
    list: [eventSchemaMock2],
    length: 1,
    qi: qiMock
};

export const eventServiceSpy = {
    getEvent() {
      return of(eventSchemaMock);
    },
    editEvent() {
      return of(eventSchemaMock);
    },
    createEvent() {
      return of(eventSchemaMock);
    },
    queryEventsPaginated() {
      return of(eventResponseMock);
    },
    deleteEvent() {
      return of(eventResponseMock2);
    }
  };
