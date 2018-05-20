import { IEventSchema, IEventResponse, IPaginator } from '../interfaces';

export function parseResponse(response: IEventSchema): IEventSchema {
    return response;
}

export function parseResponsePaginated(response: IEventResponse): IEventResponse {
    return response;
}

export function preparePaginator(paginator: IPaginator): any {
    const finalPaginator: any = {
        size: paginator.size,
        index: paginator.index,
        qi: paginator.qi,
        ...paginator.filter,
        ...paginator.exactFilter
    };
    finalPaginator.field  = paginator.sort.field;
    finalPaginator.way = paginator.sort.way;

    return finalPaginator;
}
