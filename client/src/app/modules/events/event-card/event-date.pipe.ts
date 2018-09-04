import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/*
 * Formats given event date using 'dd. MM. YYYY' format.
 * 
 * Usage:
 *   startDate | eventDatePipe:endDate
*/
@Pipe({ name: 'eventDatePipe' })
export class EventDatePipe implements PipeTransform {

    private readonly dateFormat = 'D.M. YYYY';

    transform(startDate: Date, endDate?: Date): string {
        if (startDate) {
            let formattedDate = moment(startDate).format(this.dateFormat);

            if (endDate) {
                formattedDate =  formattedDate + ' - ' + moment(endDate).format(this.dateFormat);
            }

            return formattedDate;
        }

        return '';
    }

}