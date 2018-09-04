import { EventLocationPipe } from './event-location.pipe';
import { IEventLocation } from '../../../interfaces';

describe('EventLocationPipe', () => {

    let pipe: EventLocationPipe;

    beforeEach(() => {
        pipe = new EventLocationPipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return empty string', () => {
        expect(pipe.transform(undefined)).toEqual('');

        expect(pipe.transform(<IEventLocation>{})).toEqual('');

        expect(pipe.transform(<IEventLocation>{address: ''})).toEqual('');
    });

    it('should return an address', () => {
        expect(pipe.transform(<IEventLocation>{address: 'Bratislava'})).toEqual('Bratislava');
    });

});
