import { of } from 'rxjs';

export class TranslateServiceStub {
    public get(key: any): any {
        of(key);
    }
}
