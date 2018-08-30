export class IPaginator {
    length: number;
    size: number;
    pageSizeOptions: Array<number>;
    index: number;
    filter: Object;
    sort: ISort;
    qi: string;
    exactFilter: IPaginatorFilter;

    constructor(
        length: number,
        size: number,
        pageSizeOptions: Array<number>,
        index: number,
        filter: Object,
        sort: ISort,
        exactFilter: Object,
        qi?: string
    ) {
        this.length = length;
        this.size = size;
        this.pageSizeOptions = pageSizeOptions;
        this.index = index;
        this.filter = filter;
        this.sort = sort;
        this.exactFilter = exactFilter;
        this.qi = qi ? qi : this.setQueryIndex();
    }

    setQueryIndex = (): string => {
        const min: number = Math.ceil(0);
        const max: number = Math.floor(1000000);
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }

}

export class ISort {
    field: string;
    way: string;
}

export class IPaginatorFilter {
    project?: String;
}

export class ICurrentPage {
    name: String;
    path: String;
}


export const currenPageMock1: ICurrentPage = {
    name: 'John Tester',
    path: '/path'
};
