import { Pipe, PipeTransform } from '@angular/core';
import { IEventLocation } from '../../../interfaces';

/*
 * Formats given event location as single string.
 * 
 * Usage:
 *   value | eventLocationPipe
*/
@Pipe({ name: 'eventLocationPipe' })
export class EventLocationPipe implements PipeTransform {

    transform(value: IEventLocation): string {
        return (value && value.address) || '';
    }

}