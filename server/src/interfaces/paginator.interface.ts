export class IPaginator {
    length: number | undefined;
    size: number | undefined;
    index: number | undefined;
    filter: any;
    sort: ISort | undefined;
    qi: string | undefined;     //queryIndex
    exactFilter: any;

    constructor() {
    }
}

export class ISort {
    field: string | undefined;
    way: string | undefined;
}
