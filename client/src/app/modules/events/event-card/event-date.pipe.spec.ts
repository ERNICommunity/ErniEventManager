import { EventDatePipe } from "./event-date.pipe";

describe('EventDatePipe', () => {

    let pipe: EventDatePipe;

    beforeEach(() => {
        pipe = new EventDatePipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return empty string', () => {
        expect(pipe.transform(undefined)).toEqual('');
    });

    it('should return formatted date', () => {
        expect(pipe.transform(new Date('2020-10-5'))).toEqual('5.10. 2020');
    });

    it('should return formatted dates', () => {
        expect(pipe.transform(new Date('2020-10-5'), new Date('2020-10-6'))).toEqual('5.10. 2020 - 6.10. 2020');
    });

});