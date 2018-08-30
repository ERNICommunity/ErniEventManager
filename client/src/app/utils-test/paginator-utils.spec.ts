import { IPaginator, ISort, IPaginatorFilter } from '../interfaces';

export const qiMock = '111111';

export const paginatorFilterMock: IPaginatorFilter = {};

export const sortMock: ISort = {
    field: 'name',
    way: ''
};

export const paginatorMock: IPaginator = new IPaginator(
    1,
    1,
    [5, 10],
    1,
    {},
    sortMock,
    paginatorFilterMock,
    qiMock
);
