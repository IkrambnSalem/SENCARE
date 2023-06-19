import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'float'
})
export class FloatPipe implements PipeTransform {

  transform(value: string): number {
    const regex = /[\d\.]+/;
    const result = regex.exec(value);
    if (result) {
      return parseFloat(result[0]);
    } else {
      return NaN;
    }
  }

}
