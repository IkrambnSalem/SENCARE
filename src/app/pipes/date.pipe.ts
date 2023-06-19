import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'date'
})
export class datePipe implements PipeTransform {

  transform(value: string, format: string = 'short'): string {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'yyyy-MM-dd');
    return formattedDate;
  }

}
