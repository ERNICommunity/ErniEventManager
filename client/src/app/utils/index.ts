import { IEventSchema, IEventResponse } from '../interfaces';

export function parseResponse(response: IEventSchema): IEventSchema {
    return response;
}

export function parseResponsePaginated(response: IEventResponse): IEventResponse {
    return response;
}
